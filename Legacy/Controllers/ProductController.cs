using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Legacy.Models;
using Legacy.Repositories;

namespace Legacy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _productRepository;
        public ProductController(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_productRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var product = _productRepository.GetProductById(id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }
        [HttpPut("{id}")]
        public IActionResult Put(int id, Product product)
        {
            if (id != product.Id)
            {
                return BadRequest();
            }

            _productRepository.UpdateProduct(product);
            return NoContent();
        }

        [HttpPost]
        public IActionResult Post(Product product)
        {
            _productRepository.AddProduct(product);
            return CreatedAtAction("Get", new { id = product.Id }, product);
        }

        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            _productRepository.DeleteProduct(id);
            return NoContent();
        }

        [HttpGet("details/{id}")]
        public IActionResult GetDetails(int id)
        {
            var product = _productRepository.GetProductById(id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }
    }
}

