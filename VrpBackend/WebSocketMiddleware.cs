using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using System;
using System.Net.WebSockets;
using System.Threading;
using System.Threading.Tasks;

namespace VrpBackend
{
    public static class MapWebSocketsExtensions
    {
        public static IApplicationBuilder MapWebSockets(this IApplicationBuilder builder, PathString path, 
            WebSocketHandler handler)
        {
            return builder.Map(path, (_builder) => _builder.UseMiddleware<WebSocketMiddleware>(handler));
        }
    }
    
    public class WebSocketMiddleware
    {
        private const int _BUFFER_SIZE = 1024 * 4;
        private readonly RequestDelegate _next;
        private readonly WebSocketHandler _webSocketHandler;
        
        public WebSocketMiddleware(RequestDelegate next, WebSocketHandler webSocketHandler)
        {
            _next = next;
            _webSocketHandler = webSocketHandler;
        }
        
        public async Task InvokeAsync(HttpContext context)
        {
            //TODO authentication
            if (!context.WebSockets.IsWebSocketRequest)
                return;

            WebSocket socket = await context.WebSockets.AcceptWebSocketAsync();
            _webSocketHandler.OnConnected(socket);
            var buffer = new byte[_BUFFER_SIZE];
            WebSocketReceiveResult result = await socket.ReceiveAsync(new ArraySegment<byte>(buffer), 
                CancellationToken.None);
            while (!result.CloseStatus.HasValue)
            {
                await _webSocketHandler.OnMessage(socket, result, buffer);
                result = await socket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
            }
            _webSocketHandler.OnDisconnected(socket);
        }
    }
}
