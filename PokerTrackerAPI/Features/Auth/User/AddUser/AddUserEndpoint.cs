using FastEndpoints;
using Microsoft.EntityFrameworkCore;
using PokerTrackerAPI.Features.Casino.GetCasino;
using PokerTrackerAPI.Models;
using PokerTrackerAPI.Persistence;

namespace PokerTrackerAPI.Features.Auth.User.AddUser;

public class AddUserEndpoint: Endpoint<AddUserRequest, EmptyResponse>
{
    private readonly PokerTrackerDbContext _dbContext;

    public AddUserEndpoint(PokerTrackerDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public override void Configure()
    {
        Post("users");
        AllowAnonymous();
    }

    public override async Task HandleAsync(AddUserRequest req, CancellationToken ct)
    {
        var user = new Entities.User
        {
            Id = req.Id,
            Username = req.Username,
            RoleId = req.RoleId,
            Email = req.Email
        };
        var casino = await _dbContext
            .Users
            .AddAsync(user, ct);

        await SendNoContentAsync(ct);
    }
}