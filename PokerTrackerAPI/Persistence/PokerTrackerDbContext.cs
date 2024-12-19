using Microsoft.EntityFrameworkCore;
using PokerTrackerAPI.Entities;

namespace PokerTrackerAPI.Persistence;

public class PokerTrackerDbContext : DbContext
{
    public PokerTrackerDbContext(DbContextOptions<PokerTrackerDbContext> options) : base(options)
    {
    }

    public DbSet<Casino> Casinos { get; set; }
    public DbSet<Town> Towns { get; set; }
    public DbSet<Country> Countries { get; set; }
}