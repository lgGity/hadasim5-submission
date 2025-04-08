using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GroceryManagementSystem.Common.Entities
{
    public class SupplierDto
    {
        public string SupplierId { get; set; }
        public string Company { get; set; }
        public string Phone { get; set; }
        public string SupplierName { get; set; }
        public string Password { get; set; }
        public string? Role { get; set; }
        public ICollection<ProductDto>? Products { get; set; }

    }
}
