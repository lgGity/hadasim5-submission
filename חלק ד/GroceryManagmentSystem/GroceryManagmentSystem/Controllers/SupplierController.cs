using GroceryManagementSystem.Common.Entities;
using GroceryManagementSystem.Repository.Entities;
using GroceryManagementSystem.Service.Interfaces;
using GroceryManagementSystem.Service.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GroceryManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SupplierController : ControllerBase
    {
        private IConfiguration _configuration;
        private readonly ILoginService<SupplierDto> service;
        private readonly IService<ProductDto> productService;
        public SupplierController(ILoginService<SupplierDto> service, IConfiguration configuration,IService<ProductDto> productService)
        {
            this.service = service;
            _configuration = configuration;
            this.productService = productService;
        }

        // GET: api/<SupplierController>
        [HttpGet]
        public Task<List<SupplierDto>> Get()
        {
            return service.GetAll();
        }

        // GET api/<SupplierController>/5
        [HttpGet("{id}")]
        public async Task<SupplierDto> Get(string id)
        {
            return await service.GetById(id);
        }
        [HttpGet("Login/{userId}/{password}")]
        public IActionResult Login(string userId, string password)
        {
            var user = service.Login(userId, password);
            if (user != null)
            {

                var token = Generate(user);
                var response = new
                {
                    user1 = user,
                    token1 = token
                };

                return Ok(response);
            }
            return BadRequest("User not found");

        }
        private string Generate(SupplierDto supplier)
        {
            var securityKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
        new Claim(ClaimTypes.NameIdentifier, supplier.SupplierId),
        new Claim(ClaimTypes.Name, supplier.SupplierName),
        new Claim("Company", supplier.Company),
        new Claim("Phone", supplier.Phone)
    };

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }


        // POST api/<SupplierController>
        [HttpPost]
        public async Task<ActionResult> PostAsync([FromBody] SupplierDto supplier)
        {
            if (supplier == null)
            {
                return NotFound("USER cannt add...");
            }
            supplier.Role = "user";
            return Ok(await service.AddItem(supplier));

        }
        [HttpPut("{id}")]
        [Authorize(Roles = "user")]
        public async Task PutAsync(string id,[FromBody] SupplierDto supplier)
        {
            List<ProductDto> products = new List<ProductDto>();
            if (supplier.Products != null && supplier.Products.Any())
            {
                foreach (var product in supplier.Products)
                {
                    var newProduct = new ProductDto
                    {
                        Name = product.Name,
                        PriceForItem = product.PriceForItem,
                        MinQuantity = product.MinQuantity,
                        SupplierId = id
                    };

                    var prod = await productService.AddItem(newProduct);
                    products.Add(prod);
                }
            }
            service.UpdateProductList(products,id);

        }
    }
}
