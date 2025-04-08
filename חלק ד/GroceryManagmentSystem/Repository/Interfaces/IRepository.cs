using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GroceryManagementSystem.Repository.Interfaces
{
    public interface  IRepository<T>
    {
        public Task<List<T>> GetAllAsync();
        public Task<T> Get(int id);
        public Task<T> AddItem(T item);
    
    }
}
