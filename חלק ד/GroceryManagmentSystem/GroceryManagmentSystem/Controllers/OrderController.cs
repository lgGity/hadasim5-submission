using GroceryManagementSystem.Common.Entities;
using GroceryManagementSystem.Repository.Entities;
using GroceryManagementSystem.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GroceryManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService service;
        public OrderController(IOrderService service) 
        {
        this.service = service;
        }
        // GET: api/<ValuesController>
        [HttpGet]
        public Task<List<OrderDto>> Get()
        {
            return service.GetAll();
        }

        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public async Task<OrderDto> Get(int id)
        {
            return await service.GetById(id);
        }

        [HttpGet("byStatus/{status}")]
        public async Task<List<OrderDto>> GetByStatus(string status)
        {
            return await service.GetOrdersByStatus(status);
        }
        [HttpGet("bySupplier/{supplierId}")]
        public async Task<List<OrderDto>> GetBySupplier(string supplierId)
        {
            return await service.GetOrdersBySupplier(supplierId);
        }


        // POST api/<ValuesController>
        [HttpPost]
        [Authorize(Roles = "manager")]
        public async Task<ActionResult> PostAsync([FromBody] OrderDto order)
        {
            return Ok(await service.AddItem(order));
        }
        [HttpPut("{id}")]
        [Authorize]
        public void Put(int id,[FromBody] OrderDto order)
        {

            service.UpdateStatus(order,id);
        }


    }
}
