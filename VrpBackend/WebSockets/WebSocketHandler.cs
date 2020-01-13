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

using VrpBackend.Models;
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
            byte[] parcelsBuffer = Encoding.UTF8.GetBytes(caseSerialized);
            await socket.SendAsync(new ArraySegment<byte>(parcelsBuffer, 0, parcelsBuffer.Length), result.MessageType, 
                result.EndOfMessage, CancellationToken.None);
        }   
    }

    public class JsonWorkersHandler: WebSocketHandler
    {
        private readonly List<WorkerService> _workerServices;
        public JsonWorkersHandler(List<WorkerService> workerServices)
        {
            _workerServices = workerServices;
        }
        public override async Task OnMessage(WebSocket socket, WebSocketReceiveResult result, byte[] buffer)
        {
            string jsonString = Encoding.UTF8.GetString(buffer, 0, result.Count);
            //TODO save to db
            Case caseModel = JsonSerializer.Deserialize<Case>(jsonString);
            string caseSerialized = JsonSerializer.Serialize(caseModel);
            IEnumerable<Task<Solution>> postTasksQuery = 
                from worker in _workerServices select worker.PostCase(caseSerialized);
            List<Task<Solution>> postTasks = postTasksQuery.ToList();
            while (postTasks.Count > 0)
            {
                Task<Solution> finishedTask = await Task.WhenAny(postTasks);
                postTasks.Remove(finishedTask);
                //TODO save to db
                Solution solution = await finishedTask; 
                string solutionSerialized = JsonSerializer.Serialize(solution);
                byte[] solutionsBuffer = Encoding.UTF8.GetBytes(solutionSerialized);
                await socket.SendAsync(new ArraySegment<byte>(solutionsBuffer, 0, solutionsBuffer.Length), 
                    result.MessageType, result.EndOfMessage, CancellationToken.None);
            }
        }   
    }
}
