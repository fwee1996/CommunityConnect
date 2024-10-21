namespace CommunityConnect.Models
{
    public class ContactFormSubmission
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int EventId { get; set; }
        public DateTime SubmissionDate { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }

       
        //public virtual User User { get; set; }
        //public virtual Event Event { get; set; }
    }
}
