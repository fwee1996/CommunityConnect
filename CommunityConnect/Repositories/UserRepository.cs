using CommunityConnect.Models;
using CommunityConnect.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;

namespace CommunityConnect.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(IConfiguration config) : base(config) { }

        public List<User> GetAllUsers()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {

                    cmd.CommandText = @"
                        SELECT u.id, u.email, u.password, u.fullName, u.phoneNumber, u.city, u.state, u.profileImage
                        FROM Users u
                        ";
                    var reader = cmd.ExecuteReader();

                    var users = new List<User>();

                    while (reader.Read())
                    {
                        users.Add(new User()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("id")),
                            Email = reader.GetString(reader.GetOrdinal("email")),
                            Password = reader.GetString(reader.GetOrdinal("password")),
                            FullName = reader.GetString(reader.GetOrdinal("fullName")),
                            PhoneNumber = reader.GetString(reader.GetOrdinal("phoneNumber")),
                            City = reader.GetString(reader.GetOrdinal("city")),
                            State = reader.GetString(reader.GetOrdinal("state")),
                            ProfileImage = reader.IsDBNull(reader.GetOrdinal("profileImage")) ? null : reader.GetString(reader.GetOrdinal("profileImage")),

                        });
                    }

                    reader.Close();
                    return users;
                }
            }
        }

        public User GetUserByIdWithEvents(int id)
        {
            using (var conn = Connection)
            {
                {
                    conn.Open();

                    using (var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"
                        SELECT u.id, u.email, u.password, u.fullName, u.phoneNumber, u.city, u.state, u.profileImage, e.name
                        FROM Users u
                        LEFT JOIN Events e ON u.id= e.userId 
                        WHERE u.id = @id";
                        //LEFT JOIN: even if there are no matching events, the user information is still retrieved.
                        DbUtils.AddParameter(cmd, "@id", id);

                        var reader = cmd.ExecuteReader();

                        User singleUser = null; //starts off the singleUser variable with no value(null) so can keep track of whether we have created the User object yet. If null we create a new singleUser below if not null we dont create it again 
                        List<Event> events = new List<Event>();

                        //if (reader.Read())----normally getbyId is one object so can use if but since we are retrieving multiple events use while
                        while (reader.Read())
                        {
                            // Create the user object if it hasn't been created yet
                            //why need this? To create the User object only once, even if multiple rows are returned for that user (e.g., if they have multiple events).
                            if (singleUser == null)
                            {
                                singleUser = new User
                                {
                                    Id = reader.GetInt32(reader.GetOrdinal("id")),
                                    Email = reader.GetString(reader.GetOrdinal("email")),
                                    Password = reader.GetString(reader.GetOrdinal("password")),
                                    FullName = reader.GetString(reader.GetOrdinal("fullName")),
                                    PhoneNumber = reader.GetString(reader.GetOrdinal("phoneNumber")),
                                    City = reader.GetString(reader.GetOrdinal("city")),
                                    State = reader.GetString(reader.GetOrdinal("state")),
                                    ProfileImage = reader.IsDBNull(reader.GetOrdinal("profileImage")) ? null : reader.GetString(reader.GetOrdinal("profileImage")),

                                    Events = events, // Assign the list of events to the user (initializes as an empty list if no events exist)
                                };

                            }

                            // Check if the event name is not null and add it to the events list
                            if (!reader.IsDBNull(reader.GetOrdinal("name")))
                            {
                                events.Add(new Event
                                {
                                    Name = reader.GetString(reader.GetOrdinal("name"))
                                });
                            }
                        }

                        reader.Close();
                        return singleUser;// Returns user with events (or empty list)

                    }

                }
            }
        }

        public User GetByEmail(string email)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT u.id, u.email, u.password, u.fullName, u.phoneNumber, u.city, u.state, u.profileImage
                        FROM Users u
                         WHERE Email = @email";

                    DbUtils.AddParameter(cmd, "@email", email);

                    User user = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        user = new User()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("id")),
                            Email = reader.GetString(reader.GetOrdinal("email")),
                            Password = reader.GetString(reader.GetOrdinal("password")),
                            FullName = reader.GetString(reader.GetOrdinal("fullName")),
                            PhoneNumber = reader.GetString(reader.GetOrdinal("phoneNumber")),
                            City = reader.GetString(reader.GetOrdinal("city")),
                            State = reader.GetString(reader.GetOrdinal("state")),
                            ProfileImage = reader.IsDBNull(reader.GetOrdinal("profileImage")) ? null : reader.GetString(reader.GetOrdinal("profileImage")),
                        };
                    }
                    reader.Close();

                    return user;
                }
            }
        }
        public void AddUser(User singleUser)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                INSERT INTO Users (email, password, fullName, phoneNumber, city, state, profileImage) 
                                OUTPUT INSERTED.ID VALUES (@email, @password, @fullName, @phoneNumber, @city, @state, @profileImage)";

                    DbUtils.AddParameter(cmd, "@email", singleUser.Email);
                    DbUtils.AddParameter(cmd, "@password", singleUser.Password);
                    DbUtils.AddParameter(cmd, "@fullName", singleUser.FullName);
                    DbUtils.AddParameter(cmd, "@phoneNumber", singleUser.PhoneNumber);
                    DbUtils.AddParameter(cmd, "@city", singleUser.City);
                    DbUtils.AddParameter(cmd, "@state", singleUser.State);
                    DbUtils.AddParameter(cmd, "@profileImage", singleUser.ProfileImage);

                    int id = (int)cmd.ExecuteScalar();

                    singleUser.Id = id;
                }
            }
        }

        public void UpdateUser(int id, User singleUser)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                               UPDATE Users
                               SET 
                                email = @email,
                                fullName=@fullName,
                                phoneNumber=@phoneNumber,
                                city=@city,
                                state=@state,
                                profileImage=@profileImage
                               WHERE id = @id";
                    //password=@password,
                    DbUtils.AddParameter(cmd, "@email", singleUser.Email);
                    //DbUtils.AddParameter(cmd, "@password", singleUser.Password);
                    DbUtils.AddParameter(cmd, "@fullName", singleUser.FullName);
                    DbUtils.AddParameter(cmd, "@phoneNumber", singleUser.PhoneNumber);
                    DbUtils.AddParameter(cmd, "@city", singleUser.City);
                    DbUtils.AddParameter(cmd, "@state", singleUser.State);
                    DbUtils.AddParameter(cmd, "@profileImage", singleUser.ProfileImage);
                    DbUtils.AddParameter(cmd, "@id", singleUser.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        //public void Delete(int id)
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"
        //                DELETE FROM Users
        //                WHERE id = @id
        //            ";
        //            cmd.Parameters.AddWithValue("@id", id);

        //            cmd.ExecuteNonQuery();
        //        }
        //    }
        //}



        public void Delete(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();

                // First, delete all related VolunteerSignups
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                DELETE FROM volunteerSignups
                WHERE userId = @userId
            ";
                    cmd.Parameters.AddWithValue("@userId", userId);
                    cmd.ExecuteNonQuery();
                }

                // Then, delete all related ContactFormSubmissions
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                DELETE FROM contactFormSubmissions
                WHERE userId = @userId
            ";
                    cmd.Parameters.AddWithValue("@userId", userId);
                    cmd.ExecuteNonQuery();
                }

                // Finally, delete the User
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                DELETE FROM users
                WHERE id = @userId
            ";
                    cmd.Parameters.AddWithValue("@userId", userId);
                    cmd.ExecuteNonQuery();
                }
            }
        }








    }
}
