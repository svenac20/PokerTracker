namespace PokerTrackerAPI.Features.Casino.GetCasinos;
using Entities;

public record CasinoResponse
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Town { get; set; }
}

public record GetCasinosResponse
{
    public ICollection<CasinoResponse> Casinos { get; set; }
}   