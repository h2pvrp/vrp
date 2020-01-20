using Microsoft.AspNetCore.Mvc;
using System;
using System.Net.WebSockets;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;
using VrpBackend.Workers;
using VrpBackend.WebSockets;
using VrpBackend.Models;


namespace VrpBackend.Controllers 
{
    [Route("ws")]
    public  class WebSocketController: Controller 
    {
        private const int _BUFFER_SIZE = 1024 * 4;
        private readonly WorkerService _workerService;
        private readonly WebSocketHandler _webSocketHandler;
        // TODO: from db or config file
        private readonly List<Worker> _workers = new List<Worker> {
            new Worker() 
            {
                Id = 1,
                Name = "or-tools Distance",
                Port = 5005,
            },
            
            new Worker() 
            {
                Id = 2,
                Name = "or-tools Duration",
                Port = 5006,
            },
            /*
            new Worker() 
            {
                Id = 3,
                Name = "Dummy 3",
                Port = 5007,
            }
            */
        };

        public WebSocketController(WorkerService workerService)
        {
            _workerService = workerService;
            _webSocketHandler = new JsonWorkersHandler(_workerService, _workers);
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
