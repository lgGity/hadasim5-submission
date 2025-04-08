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
    public class ProductService : IService<ProductDto>
    {
        private readonly IRepository<Product> repository;
        private readonly IMapper mapper;
        public ProductService  (IRepository<Product> repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }
        public async Task<ProductDto> AddItem(ProductDto item)
        {
            return  mapper.Map<ProductDto>(await repository.AddItem(mapper.Map<Product>(item)));
        }

        public async Task<List<ProductDto>> GetAll()
        {
            return mapper.Map<List<ProductDto>>(await repository.GetAllAsync());
        }

        public async Task<ProductDto> GetById(int id)
        {
           return mapper.Map<ProductDto>(await repository.Get(id));
        }
    }
}
