namespace PokerTrackerAPI.Entities;

public class User
{
    public Guid Id { get; set; }
    public int RoleId { get; set; }
    public Role Role { get; set; }
}