using AspNetCoreAngularDemo.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AspNetCoreAngularDemo.Persistence
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DemoDbContext context;

        public UnitOfWork(DemoDbContext context)
        {
            this.context = context;
        }

        public async Task CompleteAsync()
        {
            await context.SaveChangesAsync();    
        }
    }
}
