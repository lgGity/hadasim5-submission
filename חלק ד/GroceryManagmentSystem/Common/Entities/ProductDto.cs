using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GroceryManagementSystem.Common.Entities
{
    public class ProductDto
    {
        public int? ProdId { get; set; }
        public string Name { get; set; }
        public double PriceForItem { get; set; }
        public int MinQuantity { get; set; }
        public string SupplierId { get; set; }

    }
}
