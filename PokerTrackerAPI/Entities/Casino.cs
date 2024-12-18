namespace PokerTrackerAPI.Entities;

public class Casino : BaseEntity
{
    public string Name { get; set; }
    public Town Town { get; set; }
    
    public int TownId { get; set; }
}