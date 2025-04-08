using GroceryManagementSystem.Repository.Entities;
using GroceryManagementSystem.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using GroceryManagementSystem.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Service.Interfaces;
using GroceryManagementSystem.Common.Entities;

namespace GroceryManagementSystem.Repository.Repository
{
    public class SupplierRepository : ILogin<Supplier>
    {
        private readonly IContext _context;
        public SupplierRepository(IContext context)
        {
            _context = context;
        }
        public async Task<Supplier> AddItem(Supplier item)
        {
            await _context.Suppliers.AddAsync(item);
            await _context.SaveChanges();
            return item;
        }

        public async Task<Supplier> Get(int id)
        {
            return await _context.Suppliers.FirstOrDefaultAsync(x => x.SupplierId == id.ToString());

        }

        public async Task<List<Supplier>> GetAllAsync()
        {
            return await _context.Suppliers.ToListAsync();
        }

        public async Task<Supplier> GetById(string id)
        {
            var supplier = _context.Suppliers.Include(s => s.Products).FirstOrDefault(x => x.SupplierId == id);

            return supplier;
        }

        public Supplier Login(string id, string password)
        {
            var supplier = _context.Suppliers.FirstOrDefault(x => x.SupplierId == id && x.Password == password);
            if (supplier != null)
            {
                return supplier;
            }
            return null;
        }

        public async Task UpdateProductList(List<Product> products, string id)
        {
            Supplier supplier = _context.Suppliers.FirstOrDefault(x => x.SupplierId == id);
            if (supplier != null)
            {
                supplier.Products.Clear();

                foreach (var product in products)
                {
                    product.SupplierId = id; 
                    supplier.Products.Add(product); 
                }
            }
            await _context.SaveChanges();

        }
    }
}