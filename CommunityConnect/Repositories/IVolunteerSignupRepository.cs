using CommunityConnect.Models;

namespace CommunityConnect.Repositories
{
    public interface IVolunteerSignupRepository
    {
       // void AddVolunteerSignup(VolunteerSignup volunteerSignup);
        void AddVolunteerSignup(VolunteerSignup volunteerSignup);
        List<VolunteerSignup> GetAllVolunteers();

        //bool CheckIfUserSignedUp(int userId, int eventId);
        List<VolunteerSignup> GetVolunteersByEventId(int eventId);
    }
}