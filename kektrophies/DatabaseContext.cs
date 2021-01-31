using kektrophies.Models;
using Microsoft.EntityFrameworkCore;

namespace kektrophies
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext()
        {
        }

        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
        }

        public DbSet<TestimonialCodeModel> TestimonialCodes { get; set; }
        public DbSet<TestimonialModel> Testimonials { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=kektrophies;"); //local
            }
        }
    }
}