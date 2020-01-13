using System;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Text;
using System.Text.Json;
using VrpBackend.Models;


namespace VrpBackend.Workers
{
    public abstract class WorkerService 
    {
        public HttpClient Client { get; }
        public string PostEndpoint => "/";
        public abstract string Url { get; }
        
        public WorkerService(HttpClient client) 
        {
            client.BaseAddress = new Uri(Url);
            client.DefaultRequestHeaders.Add("Accept", "application/json");
            Client = client;
        }

        public async Task<Solution> PostCase(string jsonString)
        {
            var response = await Client.PostAsync(
                PostEndpoint, 
                new StringContent(jsonString, Encoding.UTF8, "application/json")
            );
            response.EnsureSuccessStatusCode();
            using var responseStream = await response.Content.ReadAsStreamAsync();
            return await JsonSerializer.DeserializeAsync<Solution>(responseStream);
        }
    }
}
