using System.Threading.Tasks;
using kektrophies.DTOs;
using kektrophies.Services;
using Microsoft.AspNetCore.Mvc;

namespace kektrophies.Controllers
{
    [Route("api/[controller]")]
    public class TestimonialsController : Controller
    {
        private readonly ITestimonialsService _testimonialsService;
        private readonly IPasswordService _passwordService;

        public TestimonialsController(ITestimonialsService testimonialsService, IPasswordService passwordService)
        {
            _testimonialsService = testimonialsService;
            _passwordService = passwordService;
        }

        [HttpGet]
        public async Task<IActionResult> GetTestimonials([FromQuery] int offset = 0, [FromQuery] int count = 0)
        {
            var testimonials = await _testimonialsService.GetTestimonials(offset, count);
            return Ok(new { testimonials = testimonials, testimonialCount = testimonials.Count });
        }

        [HttpPost("CreateTestimonialCode")]
        public async Task<IActionResult> CreateTestimonialCode([FromBody] CreateTestimonialCodeDto createTestimonialCodeDto)
        {
            return Ok(new {code = await _testimonialsService.CreateNewTestimonialCode(createTestimonialCodeDto)});
        }

        [HttpPost("CreateTestimonial")]
        public async Task<IActionResult> CreateTestimonial([FromBody] CreateTestimonialDto createTestimonialDto)
        {
            await _testimonialsService.CreateNewTestimonial(createTestimonialDto);
            return Ok();
        }
    }
}