using GroceryManagementSystem.Repository.Entities;
using GroceryManagementSystem.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using GroceryManagementSystem.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GroceryManagementSystem.Common.Entities;

namespace GroceryManagementSystem.Repository.Repository
{
    public class OrderRepository : IOrderRepository<Order>
    {
        private readonly IContext _context;
        public OrderRepository(IContext context) 
        {
            _context = context;
        }
        public async Task<Order> AddItem(Order item)
        {
            var newOrder = new Order
            {
                SupplierId = item.SupplierId,
                OrderDate = item.OrderDate,
                OrderStatus = item.OrderStatus,
                OrderDetails = new List<OrderDetails>() 
            };

            await _context.Orders.AddAsync(newOrder);
            await _context.SaveChanges(); 
            if (item.OrderDetails != null && item.OrderDetails.Any())
            {
                foreach (var detail in item.OrderDetails)
                {
                    var orderDetail = new OrderDetails
                    {
                        OrderId = newOrder.OrderId,
                        ProductId = detail.ProductId,
                        Quantity = detail.Quantity
                    };
                    newOrder.OrderDetails.Add(orderDetail);
                    _context.OrderDetails.Add(orderDetail);
                }
                Order o = _context.Orders.FirstOrDefault(x => x.OrderId == newOrder.OrderId);
                if (o != null)
                {
                    o.OrderDetails=newOrder.OrderDetails;
                }
                await _context.SaveChanges();
            }
            return newOrder;
        }

        public async Task<Order> Get(int id)
        {
           return await _context.Orders.FirstOrDefaultAsync(o => o.OrderId == id);
        }

        public Task<List<Order>> GetAllAsync()
        {
            return _context.Orders.ToListAsync();
        }

        public Task<List<Order>> GetOrdersByStatus(string status)
        {
            return _context.Orders.Where(o=>o.OrderStatus.ToString()==status).ToListAsync();
        }

        public Task<List<Order>> GetOrdersBySupplier(string supplier)
        {
            return _context.Orders.Where(o => o.SupplierId.ToString() == supplier).ToListAsync();
        }

        public async Task UpdateStatus(Order item, int id)
        {
            Order o = _context.Orders.FirstOrDefault(x => x.OrderId == id);
            if (o != null)
            {
                o.OrderStatus = item.OrderStatus;
                o.OrderDetails = item.OrderDetails;
                await _context.SaveChanges();
            }
        }
    }
}
