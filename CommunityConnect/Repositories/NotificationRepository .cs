using CommunityConnect.Models;
using CommunityConnect.Utils;
using Microsoft.Data.SqlClient;
using System.Reflection.PortableExecutable;

namespace CommunityConnect.Repositories
{
    public class NotificationRepository : BaseRepository, INotificationRepository
    {
        public NotificationRepository(IConfiguration config) : base(config) { }


        public List<Notification> GetNotificationsByUserId(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT n.id, n.userId, n.eventId, n.message, n.notificationDate, n.isRead
                    FROM  Notifications n

                    WHERE n.userId = @id";
                    //, u.email, u.fullName, u.phoneNumber, e.name AS eventName
                    //JOIN Events e ON e.id = n.eventId
                    //JOIN Users u ON u.id = n.userId
                    DbUtils.AddParameter(cmd, "@id", userId);

                    var reader = cmd.ExecuteReader();
                    var notifications = new List<Notification>();

                    while (reader.Read())
                    {
                        Notification notification = new Notification
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("id")),
                            UserId = reader.GetInt32(reader.GetOrdinal("userId")),
                            EventId = reader.GetInt32(reader.GetOrdinal("eventId")),
                            Message = reader.GetString(reader.GetOrdinal("message")),
                            NotificationDate = reader.GetDateTime(reader.GetOrdinal("notificationDate")),
                            IsRead = reader.GetBoolean(reader.GetOrdinal("isRead")),

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
                        notifications.Add(notification);
                    }
                    reader.Close();
                    return notifications; // Return the list for specific userId after reading all records
                }
            }
        }

        //now for notification system:

        public void AddNotification(Notification notification)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                INSERT INTO Notifications (userId, eventId, message, notificationDate, isRead)
                VALUES (@userId, @eventId, @message, @notificationDate, @isRead)";

                    // Add parameters
                    DbUtils.AddParameter(cmd, "@userId", notification.UserId);
                    DbUtils.AddParameter(cmd, "@eventId", notification.EventId);
                    DbUtils.AddParameter(cmd, "@message", notification.Message);
                    DbUtils.AddParameter(cmd, "@notificationDate", DateTime.UtcNow);
                    DbUtils.AddParameter(cmd, "@isRead", notification.IsRead);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<Notification> GetAllNotifications()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT id, userId, eventId, message, notificationDate, isRead
                        FROM Notifications 
                         
                        ORDER BY notificationDate DESC";
                    var reader = cmd.ExecuteReader();

                    var notifications = new List<Notification>();

                    while (reader.Read())
                    {
                        notifications.Add(new Notification
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("id")),
                            UserId = reader.GetInt32(reader.GetOrdinal("userId")),
                            EventId = reader.GetInt32(reader.GetOrdinal("eventId")),
                            Message = reader.GetString(reader.GetOrdinal("message")),
                            NotificationDate = reader.GetDateTime(reader.GetOrdinal("notificationDate")),
                            IsRead = reader.GetBoolean(reader.GetOrdinal("isRead")),

                        });
                    }

                    reader.Close();
                    return notifications;
                }
            }
        }
        public Notification GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT id, userId, eventId, message, notificationDate, isRead
                FROM Notifications 
                WHERE id=@id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {

                        Notification notification = new Notification
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("id")),
                            UserId = reader.GetInt32(reader.GetOrdinal("userId")),
                            EventId = reader.GetInt32(reader.GetOrdinal("notificationId")),
                            Message = reader.GetString(reader.GetOrdinal("message")),
                            NotificationDate = reader.GetDateTime(reader.GetOrdinal("notificationDate")),
                            IsRead = reader.GetBoolean(reader.GetOrdinal("isRead")),
                        };
                        reader.Close();
                        return notification;
                    }
                    reader.Close();
                    return null;
                }

            }
        }

        public void UpdateNotification(int id, Notification notification)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                               UPDATE Notifications
                               SET 
                                userId = @userId,
                                eventId=@eventId,
                                message=@message,
                                notificationDate=@notificationDate,
                                isRead=@isRead,
                               WHERE id = @id";

                    DbUtils.AddParameter(cmd, "@userId", notification.UserId);
                    DbUtils.AddParameter(cmd, "@eventId", notification.EventId);
                    DbUtils.AddParameter(cmd, "@message", notification.Message);
                    DbUtils.AddParameter(cmd, "@notificationDate", notification.NotificationDate);
                    DbUtils.AddParameter(cmd, "@id", notification.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
