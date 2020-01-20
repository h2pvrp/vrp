using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using System;
using System.Net.WebSockets;
using System.Threading;
using System.Threading.Tasks;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Collections.Generic;
using System.Linq;
using NetTopologySuite.Geometries;

using VrpBackend.EntityFramework;
using VrpBackend.Models;
using VrpBackend.Serialization;
using VrpBackend.Workers;


namespace VrpBackend.WebSockets
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
            Case caseModel = JsonSerializer.Deserialize<Case>(jsonString);
            string caseSerialized = JsonSerializer.Serialize(caseModel);
            byte[] caseBuffer = Encoding.UTF8.GetBytes(caseSerialized);
            await socket.SendAsync(new ArraySegment<byte>(caseBuffer, 0, caseBuffer.Length), result.MessageType, 
                result.EndOfMessage, CancellationToken.None);
        }   
    }

    public class JsonWorkersHandler: WebSocketHandler
    {
        private readonly WorkerService _workerService;
        private readonly WebApiContext _context;
        private readonly List<Worker> _workers;

        public JsonWorkersHandler(WorkerService workerService, WebApiContext context, List<Worker> workers)
        {
            _workerService = workerService;
            _context = context;
            _workers = workers;
        }

        public override async Task OnMessage(WebSocket socket, WebSocketReceiveResult result, byte[] buffer)
        {
            string jsonString = Encoding.UTF8.GetString(buffer, 0, result.Count);
            Case caseModel = JsonSerializer.Deserialize<CaseData>(jsonString).ToModel();
            string caseSerialized = JsonSerializer.Serialize(new CaseData(caseModel));
            IEnumerable<Task<Result>> postTasksQuery = 
                from worker in _workers select _workerService.PostCase(worker, caseSerialized);
            List<Task<Result>> postTasks = postTasksQuery.ToList();
            while (postTasks.Count > 0)
            {
                Task<Result> finishedTask = await Task.WhenAny(postTasks);
                postTasks.Remove(finishedTask);
                Result resultModel = await finishedTask;
                resultModel.CaseId = caseModel.Id;
                string resultSerialized = JsonSerializer.Serialize(new ResultData(resultModel));
                byte[] resultBuffer = Encoding.UTF8.GetBytes(resultSerialized);
                await socket.SendAsync(new ArraySegment<byte>(resultBuffer, 0, resultBuffer.Length), 
                    result.MessageType, result.EndOfMessage, CancellationToken.None);
            }
        }   
    }
}
