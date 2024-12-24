using FastEndpoints;
using Microsoft.EntityFrameworkCore;
using PokerTrackerAPI.Persistence;

namespace PokerTrackerAPI.Features.Casino.GetCasino;

public class GetCasinoEndpoint : Endpoint<GetCasinoRequest, GetCasinoResponse>
{
    private readonly PokerTrackerDbContext _dbContext;

    public GetCasinoEndpoint(PokerTrackerDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public override void Configure()
    {
        Get("casinos/{Id:int}");
        AllowAnonymous();
    }

    public override async Task HandleAsync(GetCasinoRequest req, CancellationToken ct)
    {
        var casino = await _dbContext
            .Casinos
            .Where(c => c.Id == req.Id)
            .SingleOrDefaultAsync(ct);
        
        await SendAsync(new GetCasinoResponse(casino), cancellation: ct);
    }
}