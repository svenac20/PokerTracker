using Microsoft.EntityFrameworkCore;

namespace PokerTrackerAPI.Entities;

[Index(nameof(Email), IsUnique = true)]
public class User
{
    public string Id { get; set; }
    public string? GoogleId { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public int RoleId { get; set; }
    public Role Role { get; set; }
    public ICollection<Casino> Casinos { get; set; }
}