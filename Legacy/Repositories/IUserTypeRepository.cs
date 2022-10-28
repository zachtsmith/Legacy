using Legacy.Models;
using System.Collections.Generic;

namespace Legacy.Repositories
{
    public interface IUserTypeRepository
    {
        List<UserType> GetAll();
        
    }
}