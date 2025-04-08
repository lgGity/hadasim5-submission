using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GroceryManagementSystem.Repository.Entities
{
    public class Supplier
    {
        [Key]
        public string SupplierId { get; set; }
        public string Company { get; set; }
        public string Phone { get; set; }
        public string SupplierName { get; set; }
        public ICollection<Product> Products { get; set; }
        public string Password { get; set; }
        public string Role {  get; set; }
    }
}
