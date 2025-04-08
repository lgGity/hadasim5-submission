using GroceryManagementSystem.Repository.Entities;
using GroceryManagementSystem.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using GroceryManagementSystem.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GroceryManagementSystem.Repository.Repository
{
    public class OrderDetailsRepository : IRepository<OrderDetails>
    {
        private readonly IContext _context;
        public OrderDetailsRepository(IContext context) { _context = context; }

        public async Task<OrderDetails> AddItem(OrderDetails item)
        {
            await _context.OrderDetails.AddAsync(item);
            _context.SaveChanges();
            return item;
        }

        public async Task<OrderDetails> Get(int id)
        {
            return await _context.OrderDetails.FirstOrDefaultAsync(x => x.Id == id);

        }

        public async Task<List<OrderDetails>> GetAllAsync()
        {
            return await _context.OrderDetails.ToListAsync();
        }
    }
}
