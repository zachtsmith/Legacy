using Legacy.Models;
using System.Collections.Generic;

namespace Legacy.Repositories
{
    public interface IUserProfileRepository
    {
        List<UserProfile> GetAll();
        //void Add(UserProfile userProfile);
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        UserProfile GetById(int id);
    }
}