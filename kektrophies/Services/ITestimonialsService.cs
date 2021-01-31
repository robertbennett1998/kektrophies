using System.Collections.Generic;
using System.Threading.Tasks;
using kektrophies.DTOs;
using kektrophies.Models;

namespace kektrophies.Services
{
    public interface ITestimonialsService
    {
        Task<string> CreateNewTestimonialCode(CreateTestimonialCodeDto createTestimonialCodeDto);
        Task CreateNewTestimonial(CreateTestimonialDto createTestimonialDto);
        Task<List<TestimonialModel>> GetTestimonials(int offset=0, int count=0);
    }
}