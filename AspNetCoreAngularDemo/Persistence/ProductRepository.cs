
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using AspNetCoreAngularDemo.Models;
using AspNetCoreAngularDemo.Interfaces;
using System.Linq.Expressions;
using System;
using System.Linq;
using System.Linq.Dynamic.Core;


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

        public async Task<QueryResult<Product>> GetAll(ProductQuery queryParams)
        {
            QueryResult<Product> queryResult = new QueryResult<Product>();
            IQueryable<Product> query = context.Products;

            //filtering
            if(!String.IsNullOrEmpty(queryParams.Name))
            {
                query = query.Where(p => p.Name.Contains(queryParams.Name));
            }

            //ordering
            var orderBy = "Name ASC";
            if (!String.IsNullOrEmpty(queryParams.SortBy))
            {
                orderBy = queryParams.SortBy + " ";
                orderBy += queryParams.SortAscending ? "ASC" : "DESC";
            }
            query = query.OrderBy(orderBy);

            //get total count
            queryResult.TotalItems = await query.CountAsync();

            //paging
            var page = queryParams.Page == 0 ? 1 : queryParams.Page;
            var pageSize = queryParams.PageSize == 0 ? 2 : queryParams.PageSize;
            var skipRecords = (page - 1) * pageSize;
            query = query.Skip(skipRecords).Take(pageSize);

            var products =  await query.ToListAsync();
            queryResult.Items = products;

            return queryResult;
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