using Common.Entities;
using GroceryManagementSystem.Common.Entities;
using GroceryManagementSystem.Repository;
using GroceryManagementSystem.Service.Interfaces;
using GroceryManagementSystem.Service.Services;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GroceryManagementSystem.Service
{
    public static class ServiceCollectionExtension
    {
        public static IServiceCollection AddMyServices(this IServiceCollection service )
        {
            service.AddRepositories();
            service.AddScoped<ILoginService<SupplierDto>, SupplierService>();
            service.AddScoped<IOrderService, OrderService>();
            service.AddScoped<IService<OrderDetailsDto>, OrderDetailService>();
            service.AddScoped<IService<ProductDto>, ProductService>();

            service.AddAutoMapper(typeof (MapperProfile));
            return service;
        }
    }
}
