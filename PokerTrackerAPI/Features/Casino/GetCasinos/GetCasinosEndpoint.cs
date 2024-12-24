using FastEndpoints;
using Microsoft.EntityFrameworkCore;
using PokerTrackerAPI.Persistence;

namespace PokerTrackerAPI.Features.Casino.GetCasinos;

public class GetCasinosEndpoint : Endpoint<EmptyRequest, GetCasinosResponse>
{
    private readonly PokerTrackerDbContext _dbContext;

    public GetCasinosEndpoint(PokerTrackerDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public override void Configure()
    {
        Get("casinos");
        AllowAnonymous();
    }

    public override async Task HandleAsync(EmptyRequest req, CancellationToken ct)
    {
        var casinos = await _dbContext
            .Casinos
            .ToListAsync(ct);
        
        await SendAsync(new GetCasinosResponse { Casinos = casinos }, cancellation: ct);
    }
}