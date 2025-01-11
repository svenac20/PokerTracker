namespace PokerTrackerAPI.Entities;

public class PokerGame : BaseEntity
{
    public int TablesNumber { get; set; }
    public string Limit { get; set; }
    public int GameTypeId { get; set; }
    public GameType GameType { get; set; }
    public int PlayerWaiting { get; set; }
    
    public int CasionId { get; set; }
    public Casino Casino { get; set; }
}