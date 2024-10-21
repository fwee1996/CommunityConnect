namespace CommunityConnect.Models
{
    public class Notification
    {
        public int Id { get; set; }
        public int UserId { get; set; }

        public int EventId { get; set; }
        public string Message { get; set; }
        public DateTime NotificationDate { get; set; }
        public bool IsRead { get; set; }  

        // Navigation property
        //public virtual User User { get; set; }
        //public virtual Event Event { get; set; }
    }
}
