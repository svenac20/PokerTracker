namespace PokerTrackerAPI.Models;

public record DeletePokerGame
{
    public int PokerGameId { get; init; }
    public int CasinoId { get; init; }
}