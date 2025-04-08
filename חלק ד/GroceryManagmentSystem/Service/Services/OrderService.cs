using AutoMapper;
using GroceryManagementSystem.Common.Entities;
using GroceryManagementSystem.Repository.Entities;
using GroceryManagementSystem.Repository.Interfaces;
using GroceryManagementSystem.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GroceryManagementSystem.Service.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository<Order> repository;
        private readonly IMapper mapper;
        public OrderService(IOrderRepository<Order> repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }
    
        public async Task<OrderDto> AddItem(OrderDto item)
        {
            return mapper.Map<OrderDto>(await repository.AddItem(mapper.Map<Order>(item)));
        }


        public async Task<List<OrderDto>> GetAll()
        {
            return mapper.Map<List<OrderDto>>(await repository.GetAllAsync());
        }

        public async Task<OrderDto> GetById(int id)
        {
            return mapper.Map<OrderDto>(await repository.Get(id));
        }

        public async Task<List<OrderDto>> GetOrdersByStatus(string status)
        {
            return mapper.Map<List<OrderDto>>(await repository.GetOrdersByStatus(status));

        }

        public async Task<List<OrderDto>> GetOrdersBySupplier(string supplier)
        {
            return mapper.Map<List<OrderDto>>(await repository.GetOrdersBySupplier(supplier));
        }

        public void UpdateStatus(OrderDto item, int id)
        {
            repository.UpdateStatus(mapper.Map<Order>(item), id);
        }
    }
}
