using CommunityConnect.Models;
using CommunityConnect.Utils;
using Microsoft.Data.SqlClient;

namespace CommunityConnect.Repositories
{
    public class EventRepository : BaseRepository, IEventRepository
    {
        public EventRepository(IConfiguration config) : base(config) { }

        public List<Event> GetAllEvents()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT e.id, e.userId, e.name, e.description, e.eventDate, e.startTime, e.endTime, e.address, e.city, e.state, e.numVolunteersNeeded, e.volunteersDuties, e.picture
                        FROM Events e
                         
                        ORDER BY eventDate ASC";
                    var reader = cmd.ExecuteReader();
                    //, u.fullName
                    //JOIN Users u ON u.id= e.userId

                    var events = new List<Event>();

                    while (reader.Read())
                    {
                        events.Add(new Event()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("id")),
                            UserId = reader.GetInt32(reader.GetOrdinal("userId")),
                            Name = reader.GetString(reader.GetOrdinal("name")),
                            Description = reader.GetString(reader.GetOrdinal("description")),
                            EventDate = reader.GetDateTime(reader.GetOrdinal("eventDate")),
                            StartTime = reader.GetTimeSpan(reader.GetOrdinal("startTime")),
                            EndTime = reader.GetTimeSpan(reader.GetOrdinal("endTime")),
                            Address = reader.GetString(reader.GetOrdinal("address")),
                            City = reader.GetString(reader.GetOrdinal("city")),
                            State = reader.GetString(reader.GetOrdinal("state")),
                            NumVolunteersNeeded = reader.GetInt32(reader.GetOrdinal("numVolunteersNeeded")),
                            VolunteersDuties = reader.GetString(reader.GetOrdinal("volunteersDuties")),
                            EventPicture = reader.IsDBNull(reader.GetOrdinal("picture")) ? null : reader.GetString(reader.GetOrdinal("picture"))
                            // ,
                            //User = new User
                            //{
                            //    FullName = reader.GetString(reader.GetOrdinal("fullName")),
                            //}
                        });
                    }

                    reader.Close();
                    return events;
                }
            }
        }

        public Event GetById(int id)
        {
            using (var conn = Connection)
            {
                {
                    conn.Open();

                    using (var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"
                        SELECT e.id, e.userId, e.name, e.description, e.eventDate, e.startTime, e.endTime, e.address, e.city, e.state, e.numVolunteersNeeded, e.volunteersDuties, e.picture, u.fullName
                        FROM Events e
                        JOIN Users u ON u.id= e.userId
                        WHERE e.id = @id";

                        DbUtils.AddParameter(cmd, "@id", id);

                        var reader = cmd.ExecuteReader();

                        if (reader.Read())
                        {
                            Event singleEvent = new Event
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("id")),
                                UserId = reader.GetInt32(reader.GetOrdinal("userId")),
                                Name = reader.GetString(reader.GetOrdinal("name")),
                                Description = reader.GetString(reader.GetOrdinal("description")),
                                EventDate = reader.GetDateTime(reader.GetOrdinal("eventDate")),
                                StartTime = reader.GetTimeSpan(reader.GetOrdinal("startTime")),
                                EndTime = reader.GetTimeSpan(reader.GetOrdinal("endTime")),
                                Address = reader.GetString(reader.GetOrdinal("address")),
                                City = reader.GetString(reader.GetOrdinal("city")),
                                State = reader.GetString(reader.GetOrdinal("state")),
                                NumVolunteersNeeded = reader.GetInt32(reader.GetOrdinal("numVolunteersNeeded")),
                                VolunteersDuties = reader.GetString(reader.GetOrdinal("volunteersDuties")),
                                EventPicture = reader.IsDBNull(reader.GetOrdinal("picture")) ? null : reader.GetString(reader.GetOrdinal("picture"))
                                //,
                                //User= new User
                                //{
                                //    FullName= reader.GetString(reader.GetOrdinal("fullName")),
                                //}
                            };
                            reader.Close();
                            return singleEvent;

                        }
                        reader.Close();
                        return null;
                    }
                }
            }
        }

        //public void AddEvent(Event singleEvent)
        //{
        //    using (SqlConnection conn = Connection)
        //    {
        //        conn.Open();
        //        using (SqlCommand cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"
        //                        INSERT INTO Events (name, description, eventDate, startTime, endTime, city, state, numVolunteersNeeded, volunteersDuties, picture) 
        //                        OUTPUT INSERTED.ID VALUES (@name, @description, @eventDate, @startTime, @endTime, @city, @state, @numVolunteersNeeded, @volunteersDuties, @picture)";

        //            DbUtils.AddParameter(cmd, "@name", singleEvent.Name);
        //            DbUtils.AddParameter(cmd, "@description", singleEvent.Description);
        //            DbUtils.AddParameter(cmd, "@eventDate", singleEvent.EventDate);
        //            DbUtils.AddParameter(cmd, "@startTime", singleEvent.StartTime);
        //            DbUtils.AddParameter(cmd, "@endTime", singleEvent.EndTime);
        //            DbUtils.AddParameter(cmd, "@city", singleEvent.City);
        //            DbUtils.AddParameter(cmd, "@state", singleEvent.State);
        //            DbUtils.AddParameter(cmd, "@numVolunteersNeeded", singleEvent.NumVolunteersNeeded);
        //            DbUtils.AddParameter(cmd, "@volunteersDuties", singleEvent.VolunteersDuties);
        //            DbUtils.AddParameter(cmd, "@picture", singleEvent.EventPicture);


        //            int id = (int)cmd.ExecuteScalar();

        //            singleEvent.Id = id;
        //        }
        //    }
        //}

        public void AddEvent(Event singleEvent)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Events (name, description, eventDate, startTime, endTime, address, city, state, numVolunteersNeeded, volunteersDuties, picture, userId) 
                        OUTPUT INSERTED.ID VALUES (@name, @description, @eventDate, @startTime, @endTime, @address, @city, @state, @numVolunteersNeeded, @volunteersDuties, @picture, @userId)";

                    DbUtils.AddParameter(cmd, "@name", singleEvent.Name);
                    DbUtils.AddParameter(cmd, "@description", singleEvent.Description);
                    DbUtils.AddParameter(cmd, "@eventDate", singleEvent.EventDate);
                    DbUtils.AddParameter(cmd, "@startTime", singleEvent.StartTime);
                    DbUtils.AddParameter(cmd, "@endTime", singleEvent.EndTime);
                    DbUtils.AddParameter(cmd, "@address", singleEvent.Address);
                    DbUtils.AddParameter(cmd, "@city", singleEvent.City);
                    DbUtils.AddParameter(cmd, "@state", singleEvent.State);
                    DbUtils.AddParameter(cmd, "@numVolunteersNeeded", singleEvent.NumVolunteersNeeded);
                    DbUtils.AddParameter(cmd, "@volunteersDuties", singleEvent.VolunteersDuties);
                    DbUtils.AddParameter(cmd, "@picture", singleEvent.EventPicture);
                    DbUtils.AddParameter(cmd, "@userId", singleEvent.UserId); // Use the userId parameter

                    int id = (int)cmd.ExecuteScalar();

                    singleEvent.Id = id;
                }
            }
        }


        public void UpdateEvent(int id,Event singleEvent)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                               UPDATE Events
                               SET 
                                name = @name,
                                description=@description,
                                eventDate=@eventDate,
                                startTime=@startTime,
                                endTime=@endTime,
                                address=@address,
                                city=@city,
                                state=@state,
                                numVolunteersNeeded=@numVolunteersNeeded,
                                volunteersDuties=@volunteersDuties,
                                picture=@picture
                               WHERE id = @id";

                    DbUtils.AddParameter(cmd, "@name", singleEvent.Name);
                    DbUtils.AddParameter(cmd, "@description", singleEvent.Description);
                    DbUtils.AddParameter(cmd, "@eventDate", singleEvent.EventDate);
                    DbUtils.AddParameter(cmd, "@startTime", singleEvent.StartTime);
                    DbUtils.AddParameter(cmd, "@endTime", singleEvent.EndTime);
                    DbUtils.AddParameter(cmd, "@address", singleEvent.Address);
                    DbUtils.AddParameter(cmd, "@city", singleEvent.City);
                    DbUtils.AddParameter(cmd, "@state", singleEvent.State);
                    DbUtils.AddParameter(cmd, "@numVolunteersNeeded", singleEvent.NumVolunteersNeeded);
                    DbUtils.AddParameter(cmd, "@volunteersDuties", singleEvent.VolunteersDuties);
                    DbUtils.AddParameter(cmd, "@picture", singleEvent.EventPicture);
                    DbUtils.AddParameter(cmd, "@id", singleEvent.Id);

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
        //                DELETE FROM Events
        //                WHERE id = @id
        //            ";
        //            cmd.Parameters.AddWithValue("@id", id);

        //            cmd.ExecuteNonQuery();
        //        }
        //    }
        //}

        public void Delete(int eventId)
        {
            using (var conn = Connection)
            {
                conn.Open();

                // First, delete all related VolunteerSignups
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                DELETE FROM volunteerSignups
                WHERE eventId = @eventId
            ";
                    cmd.Parameters.AddWithValue("@eventId", eventId);
                    cmd.ExecuteNonQuery();
                }

                // Then, delete all related ContactFormSubmissions
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                DELETE FROM contactFormSubmissions
                WHERE eventId = @eventId
            ";
                    cmd.Parameters.AddWithValue("@eventId", eventId);
                    cmd.ExecuteNonQuery();
                }

                // Finally, delete the Event
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                DELETE FROM events
                WHERE id = @eventId
            ";
                    cmd.Parameters.AddWithValue("@eventId", eventId);
                    cmd.ExecuteNonQuery();
                }
            }
        }







        // Retrieve events by user ID
        public IEnumerable<Event> GetEventsByUserId(int userId)
        {
            var events = new List<Event>();

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT *
                FROM Events
                WHERE userId = @userId
            ";
                    cmd.Parameters.AddWithValue("@userId", userId);

                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            var eventItem = new Event
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Name = reader.GetString(reader.GetOrdinal("Name")),
                                UserId = reader.GetInt32(reader.GetOrdinal("UserId")),
                                // Map other properties...
                            };
                            events.Add(eventItem);
                        }
                    }
                }
            }

            return events;
        }

        // Delete all events associated with a user ID
        public void DeleteEventsByUserId(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                DELETE FROM Events
                WHERE userId = @userId
            ";
                    cmd.Parameters.AddWithValue("@userId", userId);

                    cmd.ExecuteNonQuery();
                }
            }
        }





    }
}
