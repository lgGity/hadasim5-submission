using GroceryManagementSystem.Repository.Entities;
using GroceryManagementSystem.Repository.Interfaces;
using GroceryManagementSystem.Repository.Repository;
using Microsoft.Extensions.DependencyInjection;
using Service.Interfaces;

namespace GroceryManagementSystem.Repository
{
    public static class ServiceCollectionExtension
    {
        public static IServiceCollection AddRepositories(this IServiceCollection service)
        {
            service.AddScoped<ILogin<Supplier>,SupplierRepository>();
            service.AddScoped<IRepository<Product>, ProductRepository>();
            service.AddScoped<IRepository<OrderDetails>, OrderDetailsRepository>();
            service.AddScoped<IOrderRepository<Order>, OrderRepository>();
            return service;
        }
    }
}
