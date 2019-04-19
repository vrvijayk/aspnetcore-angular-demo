
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using AspNetCoreAngularDemo.Models;
using AspNetCoreAngularDemo.Interfaces;


namespace AspNetCoreAngularDemo.Persistence
{
    public class ProductRepository : IProductRepository
    {
        private readonly DemoDbContext context;

        public ProductRepository(DemoDbContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<Product>> GetAll()
        {
            return await context.Products.ToListAsync();
        }

        public async Task<Product> Get(int id)
        {
            return await context.Products.FindAsync(id);
        }

        public void Add(Product product)
        {
            context.Products.Add(product);
        }

        public void Update(Product product)
        {
            context.Entry(product).State = EntityState.Modified;
        }

        public void Remove(Product product)
        {
            context.Products.Remove(product);
        }
    }
}