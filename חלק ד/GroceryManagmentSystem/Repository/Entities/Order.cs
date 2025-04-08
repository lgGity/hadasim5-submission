using GroceryManagementSystem.Common.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GroceryManagementSystem.Repository.Entities
{
    public class Order
    {
        [Key]
        public int OrderId { get; set; }

        public DateTime OrderDate { get; set; }

        public string OrderStatus { get; set; }

        [ForeignKey("Supplier")]
        public string SupplierId { get; set; }
        public virtual Supplier Supplier { get; set; }
        public ICollection<OrderDetails> OrderDetails { get; set; }
    }
}
