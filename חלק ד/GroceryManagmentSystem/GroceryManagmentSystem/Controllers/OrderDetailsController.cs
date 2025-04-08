using Common.Entities;
using GroceryManagementSystem.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GroceryManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderDetailsController : ControllerBase
    {
        private readonly IService<OrderDetailsDto> service;
        public OrderDetailsController(IService<OrderDetailsDto> service)
        {
            this.service = service;
        }

        // GET: api/<ValuesController>
        [HttpGet]
        public Task<List<OrderDetailsDto>> Get()
        {
            return service.GetAll();
        }

        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public async Task<OrderDetailsDto> Get(int id)
        {
            return await service.GetById(id);
        }

        // POST api/<ValuesController>
        [HttpPost]
        public void Post([FromBody] OrderDetailsDto orderDetails)
        {
            service.AddItem(orderDetails);
        }

    }
}
