using System.Collections.Generic;
using Legacy.Models;

namespace Legacy.Repositories
{
    public interface ICarrierRepository
    {
        List<Carrier> GetAll();
        Carrier GetCarrierById(int id);
        void UpdateCarrier(Carrier carrier);
        void AddCarrier(Carrier carrier);
        void DeleteCarrier(int id);
    }
}