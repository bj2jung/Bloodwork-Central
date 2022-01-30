using Microsoft.EntityFrameworkCore;
using react_asp.Models;

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
