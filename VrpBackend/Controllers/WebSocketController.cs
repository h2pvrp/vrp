using Microsoft.AspNetCore.Mvc;
using System;
using System.Net.WebSockets;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;
using VrpBackend.Workers;
using VrpBackend.WebSockets;
using VrpBackend.Models;
using VrpBackend.EntityFramework;
using VrpBackend.Serialization;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace VrpBackend.Controllers 
{
    [Route("ws")]
    public  class WebSocketController: Controller 
    {
        private const int _BUFFER_SIZE = 1024 * 4;
        private readonly WorkerService _workerService;
        private readonly WebSocketHandler _webSocketHandler;
        private readonly WebApiContext _context;
        // TODO: from db or config file
        private readonly List<WorkerData> _workersData = new List<WorkerData> {
            new WorkerData() 
            {
                Name = "OR-Tools Distance",
                Port = 5005,
                Host = "http://localhost",
                Endpoint = "/"
            },
            new WorkerData() 
            {
                Name = "OR-Tools Duration",
                Port = 5006,
                Host = "http://localhost",
                Endpoint = "/"
            },
        };

        public WebSocketController(WorkerService workerService, WebApiContext context)
        {
            _workerService = workerService;
            _context = context;
            _webSocketHandler = new JsonWorkersHandler(_workerService, context, GetWorkers(_workersData, context));
        }

        private List<Worker> GetWorkers(List<WorkerData> workersData, WebApiContext context) 
        {
            List<Worker> workers = new List<Worker>();
            foreach (WorkerData workerData in workersData)
            {
                Worker worker = context.Workers.FirstOrDefault(w => w.Name == workerData.Name);
                if (worker == null)
                {
                    worker = new Worker() 
                    {
                        Name = workerData.Name,
                        Host = workerData.Host,
                        Port = workerData.Port,
                        Endpoint = workerData.Endpoint
                    };
                    context.Workers.Add(worker);
                } else {
                    worker.Host = workerData.Host;
                    worker.Port = workerData.Port;
                    worker.Endpoint = workerData.Endpoint;
                    context.Workers.Update(worker);
                }
                workers.Add(worker);
            }
            context.SaveChanges();
            return workers;
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
