using Bibliotech.Models;
using System.Collections.Generic;

namespace Bibliotech.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        void AddFriend(UserProfile currentUser, int id);
        List<UserProfile> GetAll();
        UserProfile GetAllFriends(UserProfile user);
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        UserProfile GetById(int id);
        List<UserProfile> GetNotFriends(UserProfile user);
        void UnFriend(UserProfile currentUser, int id);
    }
}