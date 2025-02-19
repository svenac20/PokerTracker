using Microsoft.AspNetCore.SignalR;
using Microsoft.Identity.Client;
using Newtonsoft.Json;
using PokerTrackerAPI.Models;
using JsonSerializer = System.Text.Json.JsonSerializer;

namespace PokerTrackerAPI.SignalR
{
    public class MessagingHub : Hub
    {
        public async Task NewPokerGame(PokerGame pokerGame)
        {
            await Clients.Others.SendAsync("NewPokerGame", pokerGame);
        } 
        
        public async Task UpdatePokerGame(PokerGame pokerGame)
        {
            await Clients.Others.SendAsync("UpdatePokerGame", pokerGame);
        }

        public async Task DeletePokerGame(DeletePokerGame deletePokerGame)
        {
            await Clients.Others.SendAsync("DeletePokerGame", deletePokerGame);
        }
    }
}