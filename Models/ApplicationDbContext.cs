using Microsoft.EntityFrameworkCore;

namespace react_asp.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<BloodPressureMeasurement> BloodPressureMeasurement { get; set; }


    }
}
