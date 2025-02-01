using Microsoft.AspNetCore.SignalR;
using PokerTrackerAPI.Models;

namespace PokerTrackerAPI.SignalR
{
    public class MessagingHub : Hub
    {
        public async Task NotifyNewPokerGame(PokerGame pokerGame)
        {
            await Clients.Others.SendAsync("NewPokerGame", pokerGame);
        } 
    }
}