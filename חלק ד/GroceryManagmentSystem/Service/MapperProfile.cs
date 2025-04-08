using AutoMapper;
using Common.Entities;
using GroceryManagementSystem.Common.Entities;
using GroceryManagementSystem.Repository.Entities;

namespace GroceryManagementSystem.Service
{
    public class MapperProfile:Profile
    {
        public MapperProfile() 
        {
            CreateMap<Supplier,SupplierDto>().ReverseMap();
            CreateMap<Product, ProductDto>().ReverseMap();
            CreateMap<Order, OrderDto>().ReverseMap();
            CreateMap<OrderDetails, OrderDetailsDto>().ReverseMap();
        }
    }
}
