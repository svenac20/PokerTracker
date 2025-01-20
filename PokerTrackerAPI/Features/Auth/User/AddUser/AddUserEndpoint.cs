using FastEndpoints;
using Microsoft.EntityFrameworkCore;
using PokerTrackerAPI.Entities;
using PokerTrackerAPI.Features.Casino.GetCasino;
using PokerTrackerAPI.Models;
using PokerTrackerAPI.Persistence;

namespace PokerTrackerAPI.Features.Auth.User.AddUser;

public class AddUserEndpoint : Endpoint<AddUserRequest, AddUserResponse>
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
        var previousUser = await _dbContext
            .Users
            .Where(u => u.Email == req.Email)
            .FirstOrDefaultAsync(ct);

        Entities.User user = null;
        if (previousUser is not null)
        {
            previousUser.GoogleId = req.GoogleId ?? previousUser.GoogleId;
            previousUser.Id = req.Id ?? previousUser.Id;
        }
        else
        {
            user = new Entities.User
            {
                Id = req.Id,
                GoogleId = req.GoogleId,
                Username = req.Username,
                RoleId = req.RoleId,
                Email = req.Email,
            };
            await _dbContext
                .Users
                .AddAsync(user, ct);
        }
        await _dbContext.SaveChangesAsync(ct);
        var finalUser = previousUser ?? user;
        await SendOkAsync(new AddUserResponse()
        {
            Email = finalUser.Email,
            GoogleId = finalUser.GoogleId,
            Id = finalUser.Id,
            RoleId = finalUser.RoleId,
            Name = finalUser.Username
        }, ct);
    }
}