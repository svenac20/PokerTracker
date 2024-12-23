namespace PokerTrackerAPI.Features.Casino.GetCasino;
using Entities;

public record GetCasinoRequest(int Id);

public record GetCasinoResponse(Casino? Casino);