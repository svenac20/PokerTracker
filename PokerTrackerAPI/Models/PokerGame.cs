namespace PokerTrackerAPI.Models;

public record PokerGame()
{
    public int Id { get; init; }
    public string GameType { get; init; }
    public string Limit { get; init; }
    public int PlayerWaiting { get; set; }
    public int TablesNumber { get; set; }
    public int CasinoId { get; set; }
    public string CasinoName { get; set; }
};