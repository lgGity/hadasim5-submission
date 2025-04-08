using GroceryManagementSystem.Repository.Entities;
using GroceryManagementSystem.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interfaces
{
    public interface ILogin<T>:IRepository<Supplier>
    {
        Supplier Login(string id ,string password);
        public Task UpdateProductList(List<Product> products, string id);
        public Task<T> GetById(string id);


    }
}
