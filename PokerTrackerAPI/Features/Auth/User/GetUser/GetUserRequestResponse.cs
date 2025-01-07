namespace PokerTrackerAPI.Features.Auth.User.GetUser;

public class GetUserRequest
{
    public string Id { get; set; }
}

public class GetUserResponse
{
    public string Id { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public int RoleId { get; set; }
}