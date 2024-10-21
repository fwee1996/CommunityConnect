//namespace CommunityConnect.Models
//{
//    public class User
//    {
//        public int Id { get; set; }
//        public string Email { get; set; }
//        public string Password { get; set; }
//        public string FullName { get; set; }
//        public string PhoneNumber { get; set; }
//        public string City { get; set; }
//        public string State { get; set; }
//        public string ProfileImage { get; set; }

//        //added:
//        public List<Event> Events { get; set; }
//    }
//}




using System.ComponentModel.DataAnnotations;

public class User
{
    public int Id { get; set; }

    [EmailAddress] 
    public string Email { get; set; }

    public string? Password { get; set; } 

    [Required] // FullName is required
    public string FullName { get; set; }

    public string PhoneNumber { get; set; } 

    public string City { get; set; } 
    public string State { get; set; } 
    public string ProfileImage { get; set; } 

    public List<Event> Events { get; set; } = new List<Event>();
   
}
