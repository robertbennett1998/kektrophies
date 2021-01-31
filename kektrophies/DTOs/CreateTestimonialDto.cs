namespace kektrophies.DTOs
{
    public class CreateTestimonialDto
    {
        public CreateTestimonialDto()
        {

        }

        public string TestimonialCode { get; set;  }
        public string Testimonial { get; set; }

        public CreateTestimonialDto(string testimonialCode, string testimonial)
        {
            TestimonialCode = testimonialCode;
            Testimonial = testimonial;
        }
    }
}