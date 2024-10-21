using CommunityConnect.Models;

namespace CommunityConnect.Repositories
{
    public interface IEventRepository
    {
        void AddEvent(Event singleEvent);

        //void AddEvent(Event singleEvent);
        void Delete(int id);
        void DeleteEventsByUserId(int userId);
        List<Event> GetAllEvents();
        Event GetById(int id);
        IEnumerable<Event> GetEventsByUserId(int userId);
        void UpdateEvent(int id, Event singleEvent);
    }
}