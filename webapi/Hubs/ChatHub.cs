
using Microsoft.AspNetCore.SignalR;
using webapi.Models;

namespace webapi.Hubs;

public class ChatHub : Hub
{
    private const string ReceiveMessage = "ReceiveMessage";
    private const string ReceiveUsers = "ReceiveUsers";
    private const string ChatBot = "Bot";
    readonly IDictionary<string, UserConnection> _connections;

    public ChatHub(IDictionary<string, UserConnection> connections) => _connections = connections;

    public async Task JoinRoom(UserConnection userConnection)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.Room);
        _connections[Context.ConnectionId] = userConnection;
        await Clients.Group(userConnection.Room)
                     .SendAsync(ReceiveMessage, ChatBot, $"{userConnection.User} has join {userConnection.Room}.");
        await SendUsersInRoom(userConnection.Room);
    }

    public async Task SendMessage(string message)
    {
        if (_connections.TryGetValue(Context.ConnectionId, out UserConnection? userConnection))
        {
            await Clients.Group(userConnection.Room)
                .SendAsync(ReceiveMessage, userConnection.User, message);
        }
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        if (_connections.TryGetValue(Context.ConnectionId, out UserConnection? userConnection))
        {
            _connections.Remove(Context.ConnectionId);
            await Clients.Group(userConnection.Room)
                .SendAsync(ReceiveMessage, ChatBot, $"{userConnection.User} has left.");
            await SendUsersInRoom(userConnection.Room);
        }

       await base.OnDisconnectedAsync(exception);
    }

    public async Task SendUsersInRoom(string room)
    {
        var users = _connections.Values.Where(v => v.Room == room).Select(v => v.User);
        await Clients.Group(room).SendAsync(ReceiveUsers, users);
 
    }
}

