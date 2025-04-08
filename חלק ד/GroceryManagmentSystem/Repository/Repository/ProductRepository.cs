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
    public class ProductRepository:IRepository<Product>
    {
        private readonly IContext _context;
        public ProductRepository(IContext context)
        {
            _context = context;
        }

        public async Task<Product> AddItem(Product item)
        {
            await _context.Products.AddAsync(item);
            await _context.SaveChanges();
            return item;
        }

        public async Task<Product> Get(int id)
        {
            return await _context.Products.FirstOrDefaultAsync(x => x.ProdId == id);
        }

        public async Task<List<Product>> GetAllAsync()
        {
            return await _context.Products.ToListAsync();
        }
    }
}
