using CommunityConnect.Models;
using CommunityConnect.Utils;
using Microsoft.Data.SqlClient;

namespace CommunityConnect.Repositories
{
    public class ContactFormSubmissionRepository : BaseRepository, IContactFormSubmissionRepository
    {
        public ContactFormSubmissionRepository(IConfiguration config) : base(config) { }

        public List<ContactFormSubmission> GetAllContactForms()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT id, userId, eventId, submissionDate, subject, message
                    FROM ContactFormSubmissions 
                         
                        ORDER BY submissionDate DESC";
                    var reader = cmd.ExecuteReader();

                    var contactForms = new List<ContactFormSubmission>();

                    while (reader.Read())
                    {
                        contactForms.Add(new ContactFormSubmission()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("id")),
                            UserId = reader.GetInt32(reader.GetOrdinal("userId")),
                            EventId = reader.GetInt32(reader.GetOrdinal("eventId")),
                            SubmissionDate = reader.GetDateTime(reader.GetOrdinal("submissionDate")),
                            Subject = reader.GetString(reader.GetOrdinal("subject")),
                            Message = reader.GetString(reader.GetOrdinal("message")),

                        });
                    }

                    reader.Close();
                    return contactForms;
                }
            }
        }


        public List<ContactFormSubmission> GetContactFormSubmissionByEventId(int eventId)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT id, userId, eventId, submissionDate, subject, message
                    FROM ContactFormSubmissions 
                    
                    WHERE eventId = @id";

                    DbUtils.AddParameter(cmd, "@id", eventId);

                    //, u.email, u.fullName, u.phoneNumber, e.name AS eventName
                    //JOIN Events e ON e.id = c.eventId
                    //JOIN Users u ON u.id = c.userId

                    var reader = cmd.ExecuteReader();
                    var contactForms = new List<ContactFormSubmission>();

                    while (reader.Read())
                    {
                        ContactFormSubmission singleContactForm = new ContactFormSubmission
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("id")),
                            UserId = reader.GetInt32(reader.GetOrdinal("userId")),
                            EventId = reader.GetInt32(reader.GetOrdinal("eventId")),
                            SubmissionDate = reader.GetDateTime(reader.GetOrdinal("submissionDate")),
                            Subject = reader.GetString(reader.GetOrdinal("subject")),
                            Message = reader.GetString(reader.GetOrdinal("message")),
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
                        contactForms.Add(singleContactForm);
                    }
                    reader.Close();
                    return contactForms; // Return the list after reading all records
                }
            }
        }


        public void AddContactFormSubmission(ContactFormSubmission contactFormSubmission)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                INSERT INTO ContactFormSubmissions (userId, eventId, submissionDate, subject, message) 
                                OUTPUT INSERTED.ID VALUES (@userId, @eventId, @submissionDate, @subject, @message)";

                    DbUtils.AddParameter(cmd, "@userId", contactFormSubmission.UserId);
                    DbUtils.AddParameter(cmd, "@eventId", contactFormSubmission.EventId);
                    DbUtils.AddParameter(cmd, "@submissionDate", contactFormSubmission.SubmissionDate);
                    DbUtils.AddParameter(cmd, "@subject", contactFormSubmission.Subject);
                    DbUtils.AddParameter(cmd, "@message", contactFormSubmission.Message);
                    //DbUtils.AddParameter(cmd, "@userId", userId);
                    //DbUtils.AddParameter(cmd, "@eventId", eventId);

                    int id = (int)cmd.ExecuteScalar();

                    contactFormSubmission.Id = id;
                }
            }
        }



    }
}
