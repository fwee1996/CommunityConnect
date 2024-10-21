using CommunityConnect.Models;

namespace CommunityConnect.Repositories
{
    public interface IContactFormSubmissionRepository
    {
        //void AddContactFormSubmission(ContactFormSubmission contactFormSubmission);
        //void AddContactFormSubmission(ContactFormSubmission contactFormSubmission, int userId, int eventId);
        void AddContactFormSubmission(ContactFormSubmission contactFormSubmission);
        List<ContactFormSubmission> GetAllContactForms();
        List<ContactFormSubmission> GetContactFormSubmissionByEventId(int eventId);
    }
}