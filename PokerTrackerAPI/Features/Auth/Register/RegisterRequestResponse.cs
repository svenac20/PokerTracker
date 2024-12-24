namespace PokerTrackerAPI.Features.Auth.Register;

public class RegisterRequest
{
    public string Username { get; set; }
    public string Password { get; set; }
}

public class RegisterResponse
{
    public string Token { get; set; }
}
