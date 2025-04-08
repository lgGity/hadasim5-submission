using GroceryManagementSystem.Common.Entities;
using GroceryManagementSystem.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GroceryManagementSystem.Service.Interfaces
{
    public interface IOrderService:IService<OrderDto>
    {
        public void UpdateStatus(OrderDto item, int id);
        public Task<List<OrderDto>> GetOrdersByStatus(string status);
        public Task<List<OrderDto>> GetOrdersBySupplier(string supplier);

    }
}
