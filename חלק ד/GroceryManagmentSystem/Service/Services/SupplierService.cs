using AutoMapper;
using GroceryManagementSystem.Common.Entities;
using GroceryManagementSystem.Repository.Entities;
using GroceryManagementSystem.Service.Interfaces;
using Service.Interfaces;
namespace GroceryManagementSystem.Service.Services
{
    public class SupplierService: ILoginService<SupplierDto>
    {
        private readonly ILogin<Supplier> repository;
        private readonly IMapper mapper;
        public SupplierService(ILogin<Supplier> repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }

        public async Task<SupplierDto> AddItem(SupplierDto item)
        {
            return mapper.Map<SupplierDto>(await repository.AddItem(mapper.Map<Supplier> (item)));
        }

        public async Task<List<SupplierDto>> GetAll()
        {
            return mapper.Map<List<SupplierDto>>(await repository.GetAllAsync());
        }

        public async Task<SupplierDto> GetById(int id)
        {
            return mapper.Map<SupplierDto>(await repository.Get(id)); 
        }

        public async Task<SupplierDto> GetById(string id)
        {
            return mapper.Map<SupplierDto>(await repository.GetById(id));
        }

        public SupplierDto Login(string id,string password) 
        {
            return mapper.Map<SupplierDto>(repository.Login(id, password));
        }

        public void UpdateProductList(List<ProductDto> products, string id)
        {
            repository.UpdateProductList(mapper.Map<List<Product>>(products), id);
        }
    }
}
