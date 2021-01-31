using kektrophies.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace kektrophies
{
    public class DatabaseContext : DbContext
    {
        private readonly IConfiguration _configuration;

        [ActivatorUtilitiesConstructor]
        public DatabaseContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        
        public DatabaseContext(IConfiguration configuration, DbContextOptions<DatabaseContext> options) : base(options)
        {
            _configuration = configuration;
        }

        public DbSet<TestimonialCodeModel> TestimonialCodes { get; set; }
        public DbSet<TestimonialModel> Testimonials { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(_configuration.GetConnectionString("kektrophies_db")); //local
            }
        }
    }
}