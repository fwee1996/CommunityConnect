using CommunityConnect.Models;
using CommunityConnect.Utils;
using Microsoft.Data.SqlClient;
using System.Collections.Generic;

namespace CommunityConnect.Repositories
{
    public class VolunteerSignupRepository : BaseRepository, IVolunteerSignupRepository
    {
        public VolunteerSignupRepository(IConfiguration config) : base(config) { }


        public List<VolunteerSignup> GetAllVolunteers()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT id, userId, eventId, signupDate, comment
                        FROM VolunteerSignups 
                         
                        ORDER BY signupDate DESC";
                    var reader = cmd.ExecuteReader();
                    //, u.fullName
                    //JOIN Users u ON u.id= e.userId

                    var volunteers = new List<VolunteerSignup>();

                    while (reader.Read())
                    {
                        volunteers.Add(new VolunteerSignup()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("id")),
                            UserId = reader.GetInt32(reader.GetOrdinal("userId")),
                            EventId = reader.GetInt32(reader.GetOrdinal("eventId")),
                            SignupDate = reader.GetDateTime(reader.GetOrdinal("signupDate")),
                            Comment = reader.IsDBNull(reader.GetOrdinal("comment")) ? null : reader.GetString(reader.GetOrdinal("comment")),
                          
                        });
                    }

                    reader.Close();
                    return volunteers;
                }
            }
        }

        public List<VolunteerSignup> GetVolunteersByEventId(int eventId)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT id, userId, eventId, signupDate, comment
                    FROM VolunteerSignups 
                  
                    WHERE eventId = @id";

                    //, u.email, u.fullName, u.phoneNumber, e.name AS eventName
                    //  JOIN Events e ON e.id = v.eventId
                    //JOIN Users u ON u.id = v.userId

                    DbUtils.AddParameter(cmd, "@id", eventId);

                    var reader = cmd.ExecuteReader();
                    var volunteerSignups = new List<VolunteerSignup>();

                    while (reader.Read())
                    {
                        VolunteerSignup volunteerSignup = new VolunteerSignup
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("id")),
                            UserId = reader.GetInt32(reader.GetOrdinal("userId")),
                            EventId = reader.GetInt32(reader.GetOrdinal("eventId")),
                            SignupDate = reader.GetDateTime(reader.GetOrdinal("signupDate")),
                            Comment = reader.IsDBNull(reader.GetOrdinal("comment")) ? null : reader.GetString(reader.GetOrdinal("comment")), // Handle NULL comments!

                            //User = new User
                            //{
                            //    FullName = reader.GetString(reader.GetOrdinal("fullName")),
                            //    Email = reader.GetString(reader.GetOrdinal("email")),
                            //    PhoneNumber = reader.GetString(reader.GetOrdinal("phoneNumber")),
                            //},
                            //Event = new Event
                            //{
                            //    Name = reader.GetString(reader.GetOrdinal("eventName")),
                            //}
                        };
                        volunteerSignups.Add(volunteerSignup);
                    }
                    reader.Close();
                    return volunteerSignups; // Return the list after reading all records
                }
            }
        }

        public void AddVolunteerSignup(VolunteerSignup volunteerSignup)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO VolunteerSignups (userId, eventId, signupDate,comment) OUTPUT INSERTED.ID VALUES (@userId, @eventId, @signupDate, @comment)";

                    DbUtils.AddParameter(cmd, "@userId", volunteerSignup.UserId);
                    DbUtils.AddParameter(cmd, "@eventId", volunteerSignup.EventId);
                    DbUtils.AddParameter(cmd, "@signupDate", volunteerSignup.SignupDate);
                    DbUtils.AddParameter(cmd, "@comment", volunteerSignup.Comment ?? (object)DBNull.Value); // Handle null
                    //DbUtils.AddParameter(cmd, "@userId", userId);
                    //DbUtils.AddParameter(cmd, "@eventId", eventId);

                    int id = (int)cmd.ExecuteScalar(); // Auto generated ID

                    volunteerSignup.Id = id;// Set the newly generated ID
                }
            }
        }

        //public bool CheckIfUserSignedUp(int userId, int eventId)
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();

        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"
        //        SELECT COUNT(*)
        //        FROM VolunteerSignups
        //        WHERE userId = @userId AND eventId = @eventId";

        //            DbUtils.AddParameter(cmd, "@userId", userId);
        //            DbUtils.AddParameter(cmd, "@eventId", eventId);

        //            return (int)cmd.ExecuteScalar() > 0; // Returns true if there is at least one record
        //        }
        //    }
        //}

    }
}

