namespace CommunityConnect.Models
{
    public class VolunteerSignup
    {
        public int Id { get; set; }
        public int UserId { get; set; } //volunteer's id
        public int EventId { get; set; }
        public DateTime SignupDate { get; set; }
        public string Comment { get; set; }

        // optional
        //when you get eror:User: ["The User field is required."], Event: ["The Event field is required."]
        //i used =new User(); but then all the user field data required that i
        //public User User { get; set; }
        //public Event Event { get; set; }
    }
}
