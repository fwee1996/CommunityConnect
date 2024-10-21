using CommunityConnect.Models;

namespace CommunityConnect.Repositories
{
    public interface INotificationRepository
    {
        //List<Notification> AllNotifications { get; }

        void AddNotification(Notification notification);
        List<Notification> GetAllNotifications();
        Notification GetById(int id);
        List<Notification> GetNotificationsByUserId(int userId);
        void UpdateNotification(int id, Notification notification);
    }
}