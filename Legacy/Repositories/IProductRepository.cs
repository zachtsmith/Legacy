using System.Collections.Generic;
using Legacy.Models;

namespace Legacy.Repositories
{
    public interface IProductRepository
    {
        List<Product> GetAll();
        Product GetProductById(int id);
        void UpdateProduct(Product product);
        void AddProduct(Product product);
        void DeleteProduct(int id);
    }
}