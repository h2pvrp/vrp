using System;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Text;
using System.Text.Json;
using VrpBackend.Models;


namespace VrpBackend.Workers
{
    public class WorkerService 
    {
        public HttpClient Client { get; }

        public WorkerService(HttpClient client) 
        {
            client.DefaultRequestHeaders.Add("Accept", "application/json");
            Client = client;
        }

        public async Task<Solution> PostCase(Worker worker, string jsonString)
        {
            var response = await Client.PostAsync(
                worker.Url(), 
                new StringContent(jsonString, Encoding.UTF8, "application/json")
            );
            response.EnsureSuccessStatusCode();
            using var responseStream = await response.Content.ReadAsStreamAsync();
            Solution solution = await JsonSerializer.DeserializeAsync<Solution>(responseStream);
            solution.Worker = worker;
            solution.WorkerId = worker.Id;
            return solution;
        }
    }
}
