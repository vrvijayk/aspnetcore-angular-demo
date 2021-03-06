using System.Collections.Generic;
using System.Threading.Tasks;
using AspNetCoreAngularDemo.Models;

namespace AspNetCoreAngularDemo.Interfaces
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> GetAll();
        Task<QueryResult<Product>> GetAll(ProductQuery queryParams);
        Task<Product> Get(int id);
        void Add(Product product);
        void Update(Product product);
        void Remove(Product product);
    }
}