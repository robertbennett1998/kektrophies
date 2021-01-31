using System;
using System.ComponentModel.DataAnnotations;

namespace kektrophies.Models
{
    public class TestimonialCodeModel
    {
        public TestimonialCodeModel(DateTime expirationDateTime)
        {
            ExpirationDateTime = expirationDateTime;
        }

        public TestimonialCodeModel(string firstName, string lastName, string description, string code, DateTime expirationDateTime)
        {
            FirstName = firstName;
            LastName = lastName;
            Description = description;
            Code = code;
            ExpirationDateTime = expirationDateTime;
        }

        [Key] public int Id { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Description { get; set; }
        public string Code { get; set; }
        public DateTime ExpirationDateTime { get; set; }
    }
}