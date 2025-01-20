using FastEndpoints;
using Microsoft.EntityFrameworkCore;
using PokerTrackerAPI.Persistence;

namespace PokerTrackerAPI.Features.Auth.User.GetUser;

public class GetUserEndpoint : Endpoint<GetUserRequest, GetUserResponse>
{
    private readonly PokerTrackerDbContext _dbContext;

    public GetUserEndpoint(PokerTrackerDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public override void Configure()
    {
        Get("users/{Id}");
        AllowAnonymous();
    }

    public override async Task HandleAsync(GetUserRequest req, CancellationToken ct)
    {
        var user = await _dbContext.Users
                .Where(u => u.Id == req.Id)
                .FirstOrDefaultAsync(ct);

        if (user == null)
        {
            await SendNotFoundAsync(ct);
            return;
        }

        var response = new GetUserResponse
        {
            Id = user.Id,
            Name = user.Username,
            Email = user.Email,
            RoleId = user.RoleId
        };

        await SendAsync(response, cancellation: ct);
    }
}