namespace kektrophies.DTOs
{
    public class CreateTestimonialCodeDto
    {
        public CreateTestimonialCodeDto()
        {
                
        }

        public CreateTestimonialCodeDto(string firstName, string lastName, string description, string adminPassword)
        {
            FirstName = firstName;
            LastName = lastName;
            Description = description;
            AdminPassword = adminPassword;
        }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Description { get; set; }
        public string AdminPassword { get; set; }
    }
}