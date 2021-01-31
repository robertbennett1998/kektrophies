using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using kektrophies.DTOs;
using kektrophies.Exceptions;
using kektrophies.Models;

namespace kektrophies.Services
{
    public class TestimonialsService : ITestimonialsService
    {
        private readonly ICryptoService _cryptoService;
        private readonly IPasswordService _passwordService;
        private readonly DatabaseContext _databaseContext;
        private readonly string _adminPasswordHash;

        public TestimonialsService(ICryptoService cryptoService, IPasswordService passwordService, DatabaseContext databaseContext)
        {
            _cryptoService = cryptoService;
            _passwordService = passwordService;
            _databaseContext = databaseContext;

            _adminPasswordHash = "WbjE3DyJpgjFZFucas8KmmdVq8xhjookF/fvk+NTmpM=rUKBQg1U8RdqXWJPAE0WkqmCRI4Qe/k71MFTkQRth/s=4wcAAA==";
        }

        public async Task<string> CreateNewTestimonialCode(CreateTestimonialCodeDto createTestimonialCodeDto)
        {
            if (!_passwordService.CheckPassword(createTestimonialCodeDto.AdminPassword, _adminPasswordHash))
                throw new IncorrectAdminPasswordException();

            string code;
            // Ensure no clashes no matter how unlikely
            do
            {
                code = _cryptoService.GenerateCode(6);
            } while (_databaseContext.TestimonialCodes.Any(c => c.Code == code));

            await _databaseContext.TestimonialCodes.AddAsync(new TestimonialCodeModel(
                createTestimonialCodeDto.FirstName, createTestimonialCodeDto.LastName,
                createTestimonialCodeDto.Description, code, DateTime.Now.AddDays(28)));
            await _databaseContext.SaveChangesAsync();

            return code;
        }

        public async Task CreateNewTestimonial(CreateTestimonialDto createTestimonialDto)
        {
            var testimonialCode = _databaseContext.TestimonialCodes.FirstOrDefault(tc => tc.Code == createTestimonialDto.TestimonialCode);
            if (testimonialCode == null)
                throw new TestimonialCodeDoesNotExistException();

            if (DateTime.Now > testimonialCode.ExpirationDateTime)
            {
                _databaseContext.TestimonialCodes.Remove(testimonialCode);
                await _databaseContext.SaveChangesAsync();
                
                throw new TestimonialCodeExpiredException();
            }

            var testimonial = new TestimonialModel(testimonialCode.FirstName, testimonialCode.LastName, testimonialCode.Description, createTestimonialDto.Testimonial);

            await _databaseContext.Testimonials.AddAsync(testimonial);
            _databaseContext.TestimonialCodes.Remove(testimonialCode);

            await _databaseContext.SaveChangesAsync();
        }

        public async Task<List<TestimonialModel>> GetTestimonials(int offset, int count)
        {
            if (count == 0)
            {
                return await Task.FromResult(_databaseContext.Testimonials.Skip(offset).ToList());
            }
            else if (count < 0)
            {
                offset += count;
                count *= -1;
            }

            if (offset < 0)
                offset = 0;
            
            return await Task.FromResult(_databaseContext.Testimonials.Skip(offset).Take(count).ToList());
        }
    }
}