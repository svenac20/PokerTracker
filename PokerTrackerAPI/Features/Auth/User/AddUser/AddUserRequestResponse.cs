namespace PokerTrackerAPI.Features.Auth.User.AddUser;

public record AddUserRequest
{
    public string Id { get; init; }
    public string Username { get; init; }
    public string Email { get; init; }
    public int RoleId { get; init; }
}