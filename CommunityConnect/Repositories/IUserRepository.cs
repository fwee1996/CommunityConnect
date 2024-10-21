using CommunityConnect.Models;

namespace CommunityConnect.Repositories
{
    public interface IUserRepository
    {
        void AddUser(User singleUser);
        void Delete(int userId);
        List<User> GetAllUsers();
        User GetByEmail(string email);
        User GetUserByIdWithEvents(int id);
        void UpdateUser(int id, User singleUser);
    }
}