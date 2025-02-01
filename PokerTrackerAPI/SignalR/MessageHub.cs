using Microsoft.AspNetCore.SignalR;
using Microsoft.Identity.Client;
using Newtonsoft.Json;
using PokerTrackerAPI.Models;
using JsonSerializer = System.Text.Json.JsonSerializer;

namespace PokerTrackerAPI.SignalR
{
    public class MessagingHub : Hub
    {
        public async Task AddToGroup(string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
        }
        public async Task NewPokerGame(PokerGame pokerGame)
        {
            await Clients.Others.SendAsync("NewPokerGame", pokerGame);
        } 
    }
}