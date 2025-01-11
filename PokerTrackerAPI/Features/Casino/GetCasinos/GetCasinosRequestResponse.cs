namespace PokerTrackerAPI.Features.Casino.GetCasinos;
using Entities;

public record PokerGameDto
{
    public int Id { get; set; }
    public int TablesNumber { get; set; }
    public string GameType { get; set; }
    public int PlayerWaiting { get; set; }
    public string CasinoName { get; set; }
    public string Limit { get; set; }
}

public record CasinoResponse
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Town { get; set; }
    public IEnumerable<PokerGameDto> PokerGames { get; set; }
}

public record GetCasinosResponse
{
    public ICollection<CasinoResponse> Casinos { get; set; }
}   
