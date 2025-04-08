using GroceryManagementSystem.Common.Entities;
using GroceryManagementSystem.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GroceryManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IService<ProductDto> service;
        public ProductController(IService<ProductDto> service)
        {
            this.service = service;
        }

        // GET: api/<ValuesController>
        [HttpGet]
        public Task<List<ProductDto>> Get()
        {
            return service.GetAll();
        }

        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public async Task<ProductDto> Get(int id)
        {
            return await service.GetById(id);
        }


        // POST api/<ValuesController>
        [HttpPost]
        [Authorize(Roles = "user")]
        public void Post([FromBody] ProductDto product)
        {
            service.AddItem(product);
        }

    }
}
