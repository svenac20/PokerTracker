namespace PokerTrackerAPI.Entities;

public class Town : BaseEntity
{
    public string Name { get; set;  }
    public Country Country { get; set; }
    
    public int CountryId { get; set; }
}