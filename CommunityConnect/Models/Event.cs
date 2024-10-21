using System.ComponentModel.DataAnnotations;

public class Event
{
    public int Id { get; set; }
    public int UserId { get; set; }

    [Required] 
    public string Name { get; set; }

    [Required] 
    public string Description { get; set; }

    [Required] 
    public DateTime EventDate { get; set; }
    //DateTime string in ISO 8601 format(e.g., 2023-10-06T15:00:00Z), but frontend <input
    //type="date"> expects yyyy-MM-dd

    [Required] 
    public TimeSpan StartTime { get; set; }
    //Timespan:HH:mm:ss
    //fronend:  <input type="time" expects HH:mm

    [Required] 
    public TimeSpan EndTime { get; set; }

    [Required]
    public string Address { get; set; }

    [Required] 
    public string City { get; set; }

    [Required] 
    public string State { get; set; }

    public int NumVolunteersNeeded { get; set; }

    public string VolunteersDuties { get; set; } // Optional
    public string EventPicture { get; set; } // Optional

         //  public virtual User User { get; set; }
}
