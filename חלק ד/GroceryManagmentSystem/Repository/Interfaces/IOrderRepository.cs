using GroceryManagementSystem.Common.Entities;
using GroceryManagementSystem.Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GroceryManagementSystem.Repository.Interfaces
{
    public interface IOrderRepository<T>:IRepository<Order>
    {
        public Task UpdateStatus(T item,int id);
        public Task<List<T>> GetOrdersByStatus(string status);
        public Task<List<T>> GetOrdersBySupplier(string supplier);


    }
}
