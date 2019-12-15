using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using System;
using System.Net.WebSockets;
using System.Threading;
using System.Threading.Tasks;

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
}
