using Microsoft.AspNetCore.Mvc;
using System;
using System.Net.WebSockets;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;
using VrpBackend.Workers;
using VrpBackend.WebSockets;


namespace VrpBackend.Controllers 
{
    [Route("ws")]
    public  class WebSocketController: Controller 
    {
        private const int _BUFFER_SIZE = 1024 * 4;
        private readonly List<WorkerService> _workerServices;
        private readonly WebSocketHandler _webSocketHandler;

        public WebSocketController(DummyWorker testWorker)
        {
            _workerServices = new List<WorkerService>{testWorker};
            _webSocketHandler = new JsonWorkersHandler(_workerServices);
        }

        [HttpGet]
        public async Task Get()
        {
            var context = ControllerContext.HttpContext;
            var isSocketRequest = context.WebSockets.IsWebSocketRequest;

            if (!isSocketRequest)
                context.Response.StatusCode = 401;
            else 
            {
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
}
