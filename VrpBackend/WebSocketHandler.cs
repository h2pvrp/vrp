using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using System;
using System.Net.WebSockets;
using System.Threading;
using System.Threading.Tasks;

using System.Text;
using System.Text.Json;
using System.Collections.Generic;

using VrpBackend.Models;

namespace VrpBackend
{
    public abstract class WebSocketHandler
    {
        public virtual void OnConnected(WebSocket socket) 
        {}

        public virtual void OnDisconnected(WebSocket socket) 
        {}

        public abstract Task OnMessage(WebSocket socket, WebSocketReceiveResult result, byte[] buffer);
    }
    
    public class EchoHandler: WebSocketHandler
    {
        public override async Task OnMessage(WebSocket socket, WebSocketReceiveResult result, byte[] buffer)
        {
            await socket.SendAsync(new ArraySegment<byte>(buffer, 0, result.Count), result.MessageType, 
                result.EndOfMessage, CancellationToken.None);
        }
    }

    public class JsonEchoHandler: WebSocketHandler
    {
        public override async Task OnMessage(WebSocket socket, WebSocketReceiveResult result, byte[] buffer)
        {
            string jsonString = Encoding.UTF8.GetString(buffer, 0, result.Count);
            List<Package> parcels = JsonSerializer.Deserialize<List<Package>>(jsonString);
            
            string parcelsSerialized = JsonSerializer.Serialize(parcels);
            byte[] parcelsBuffer = Encoding.UTF8.GetBytes(parcelsSerialized);
            await socket.SendAsync(new ArraySegment<byte>(parcelsBuffer, 0, parcelsBuffer.Length), result.MessageType, 
                result.EndOfMessage, CancellationToken.None);
        }   
    }
}
