using GroceryManagementSystem.Repository.Entities;
using GroceryManagementSystem.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace GroceryManagementSystem.GroceryDbContext
{
    public class MyGroceryContext : DbContext,IContext 
    {

        public DbSet<Supplier> Suppliers { get ; set; }
        public DbSet<Product> Products { get ; set ; }
        public DbSet<OrderDetails> OrderDetails { get; set; }
        public DbSet<Order> Orders { get; set ; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("server=(localdb)\\MSSQLLocalDB;database=GroceryManagementSys;trusted_connection=true");
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<OrderDetails>()
                .HasOne(od => od.Product)
                .WithMany()
                .HasForeignKey(od => od.ProductId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Product>()
                .HasOne(p => p.Supplier)
                .WithMany(s => s.Products)
                .HasForeignKey(p => p.SupplierId)
                .OnDelete(DeleteBehavior.NoAction);
        }
        public async Task SaveChanges()
        {
            await SaveChangesAsync();
        }
    
    }
}
