using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
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
        private readonly RequestDelegate _next;
        private readonly WebSocketHandler _webSocketHandler;
        
        public WebSocketMiddleware(RequestDelegate next, WebSocketHandler webSocketHandler)
        {
            _next = next;
            _webSocketHandler = webSocketHandler;
        }
        
        public async Task InvokeAsync(HttpContext context)
        {
            await context.Response.WriteAsync("Elo");
        }
    }
}
