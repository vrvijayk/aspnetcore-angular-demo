using AspNetCoreAngularDemo.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AspNetCoreAngularDemo.Persistence
{
    public class DemoDbContext: DbContext
    {
        public DemoDbContext(DbContextOptions<DemoDbContext> options): base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<User> Users{ get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>().Property(p => p.Price).HasColumnType("decimal(10, 2)");

            modelBuilder.Entity<Role>().Property(p => p.Name).IsRequired().HasMaxLength(200);

            modelBuilder.Entity<User>().Property(p => p.Name).IsRequired().HasMaxLength(200);
            modelBuilder.Entity<User>().Property(p => p.Username).IsRequired().HasMaxLength(50);
            modelBuilder.Entity<User>().Property(p => p.Password).IsRequired().HasMaxLength(50);

            modelBuilder.Entity<UserRole>().ToTable("UserRoles");
            modelBuilder.Entity<UserRole>().HasKey(ur => new { ur.UserId, ur.RoleId });
            modelBuilder.Entity<UserRole>().HasOne(ur => ur.User).WithMany(u => u.UserRoles).HasForeignKey(u => u.UserId);
            modelBuilder.Entity<UserRole>().HasOne(ur => ur.Role).WithMany(r => r.UserRoles).HasForeignKey(r => r.RoleId);
        }
    }
}
