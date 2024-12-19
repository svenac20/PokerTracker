namespace PokerTrackerAPI.Features.Casino.GetCasinos;
using Entities;

public record GetCasinosResponse
{
    public ICollection<Casino> Casinos { get; set; }
}   