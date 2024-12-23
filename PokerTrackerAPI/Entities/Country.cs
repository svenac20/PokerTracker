using System.Collections.Generic;

namespace PokerTrackerAPI.Entities;

public class Country : BaseEntity
{
    public string Name { get; set; }
    public ICollection<Town> Towns { get; set; }
    
}