using PokerTrackerAPI.Entities;
using PokerTrackerAPI.Features.Casino.GetCasinos;

namespace PokerTrackerAPI.Models;

public static class Mappings
{
    public static PokerGameDto ToDto(this PokerGame pokerGame, string casinoName)
    {
        return new PokerGameDto
        {
            Id = pokerGame.Id,
            TablesNumber = pokerGame.TablesNumber,
            GameType = pokerGame.GameType.Name,
            PlayerWaiting = pokerGame.PlayerWaiting,
            CasinoName = casinoName,
            Limit = pokerGame.Limit
        };
    }
}