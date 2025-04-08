using Common.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GroceryManagementSystem.Common.Entities
{
    public enum OrderStatus
    {
        Pending=0,
        Processing=1,
        Completed=2
    }

    public class OrderDto
    {
        public int OrderId { get; set; }
        public string SupplierId { get; set; }
        public DateTime OrderDate { get; set; }
        public string OrderStatus { get; set; }
        public ICollection<OrderDetailsDto>? OrderDetails { get; set; }

    }
}
