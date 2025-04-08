using GroceryManagementSystem.Common.Entities;
using GroceryManagementSystem.Repository.Entities;
using GroceryManagementSystem.Service.Interfaces;
using Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GroceryManagementSystem.Service.Interfaces
{
    public interface ILoginService<SupplierDto>: IService<SupplierDto>
    {
        SupplierDto Login(string id,string password);
        public void UpdateProductList(List<ProductDto> products, string id);
        public Task<SupplierDto> GetById(string id);

    }
}
