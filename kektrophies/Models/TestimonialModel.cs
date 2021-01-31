using System.ComponentModel.DataAnnotations;

namespace kektrophies.Models
{
    public class TestimonialModel
    {
        public TestimonialModel(string firstName, string lastName, string description, string testimonial)
        {
            FirstName = firstName;
            LastName = lastName;
            Description = description;
            Testimonial = testimonial;
        }

        public TestimonialModel()
        {
        }

        [Key] public int Id { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Description { get; set; }
        public string Testimonial { get; set; }

        public static TestimonialModel FromTestimonialCode(TestimonialCodeModel testimonialCodeModel,
            string testimonial)
        {
            return new TestimonialModel(testimonialCodeModel.FirstName, testimonialCodeModel.LastName,
                testimonialCodeModel.Description, testimonial);
        }
    }
}