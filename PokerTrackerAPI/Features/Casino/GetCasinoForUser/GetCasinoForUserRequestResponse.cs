namespace PokerTrackerAPI.Features.Casino.GetCasinoForUser;

public record GetCasinoForUserRequest(string Id);

public record CasinoDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Town { get; set; }
}

public record GetCasinoForUserResponse
{
    public ICollection<CasinoDto> Casinos { get; set; }
}   