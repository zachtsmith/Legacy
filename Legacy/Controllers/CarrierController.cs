using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Legacy.Models;
using Legacy.Repositories;

namespace Legacy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarrierController : ControllerBase
    {
        private readonly ICarrierRepository _carrierRepository; 
        public CarrierController(ICarrierRepository carrierRepository)
        {
            _carrierRepository = carrierRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_carrierRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var carrier = _carrierRepository.GetCarrierById(id);
            if (carrier == null)
            {
                return NotFound();
            }
            return Ok(carrier);
        }
        [HttpPut("{id}")]
        public IActionResult Put(int id, Carrier carrier)
        {
            if (id != carrier.Id)
            {
                return BadRequest();
            }

            _carrierRepository.UpdateCarrier(carrier);
            return NoContent();
        }

        [HttpPost]
        public IActionResult Post(Carrier carrier)
        {
            _carrierRepository.AddCarrier(carrier);
            return CreatedAtAction("Get", new { id = carrier.Id }, carrier);
        }

        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            _carrierRepository.DeleteCarrier(id);
            return NoContent();
        }

        [HttpGet("details/{id}")]
        public IActionResult GetDetails(int id)
        {
            var carrier = _carrierRepository.GetCarrierById(id);
            if (carrier == null)
            {
                return NotFound();
            }
            return Ok(carrier);
        }
    }
}






