using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GroceryManagementSystem.Repository.Entities
{
    public class Product
    {
        [Key]
        public int ProdId { get; set; }
        public string Name { get; set; }
        public double PriceForItem { get; set; }
        public int MinQuantity { get; set; }

        [ForeignKey("Supplier")]
        public string SupplierId { get; set; }
        public virtual Supplier Supplier { get; set; }

    }
}
