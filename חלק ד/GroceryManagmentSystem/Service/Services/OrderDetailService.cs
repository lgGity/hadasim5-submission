using AutoMapper;
using Common.Entities;
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
    public class OrderDetailService : IService<OrderDetailsDto>
    {
        private readonly IRepository<OrderDetails> repository;
        private readonly IMapper mapper;
        public OrderDetailService(IRepository<OrderDetails> repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }

        public async Task<OrderDetailsDto> AddItem(OrderDetailsDto item)
        {
            return mapper.Map<OrderDetailsDto>(await repository.AddItem(mapper.Map<OrderDetails>(item)));
        }

        public async Task<List<OrderDetailsDto>> GetAll()
        {
            return mapper.Map<List<OrderDetailsDto>>(await repository.GetAllAsync());
        }

        public async Task<OrderDetailsDto> GetById(int id)
        {
            return mapper.Map<OrderDetailsDto>(await repository.Get(id));
        }
    }
}
