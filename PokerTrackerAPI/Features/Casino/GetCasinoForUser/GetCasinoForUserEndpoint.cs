using FastEndpoints;
using Microsoft.EntityFrameworkCore;
using PokerTrackerAPI.Entities;
using PokerTrackerAPI.Features.Casino.GetCasino;
using PokerTrackerAPI.Middlewares;
using PokerTrackerAPI.Persistence;

namespace PokerTrackerAPI.Features.Casino.GetCasinoForUser;

public class GetCasinoForUserEndpoint : Endpoint<GetCasinoForUserRequest, GetCasinoForUserResponse>
{
    private readonly PokerTrackerDbContext _dbContext;

    public GetCasinoForUserEndpoint(PokerTrackerDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public override void Configure()
    {
        Get("users/{Id}/casinos");
        AllowAnonymous();
        PreProcessor<RoleMiddleware>();
    }

    public override async Task HandleAsync(GetCasinoForUserRequest req, CancellationToken ct)
    {
        var casinos = await _dbContext
            .Casinos
            .Where(c => c.Owners.Any(o => o.Id == req.Id))
            .Select(c => new CasinoDto()
            {
                Name = c.Name,
                Id = c.Id,
                Town = c.Town.Name,
            })
            .ToListAsync(ct);
        
        await SendAsync(new GetCasinoForUserResponse { Casinos = casinos }, cancellation: ct);
        
    }
}