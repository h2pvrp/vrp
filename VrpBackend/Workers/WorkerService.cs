using System;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Text;
using System.Text.Json;

using VrpBackend.Models;
using VrpBackend.Serialization;


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

        public async Task<Result> PostCase(Worker worker, string jsonString)
        {
            var response = await Client.PostAsync(
                worker.Url(), 
                new StringContent(jsonString, Encoding.UTF8, "application/json")
            );
            response.EnsureSuccessStatusCode();
            using var responseStream = await response.Content.ReadAsStreamAsync();
            ResultData resultDataModel = await JsonSerializer.DeserializeAsync<ResultData>(responseStream);
            Result resultModel = resultDataModel.ToModel();
            resultModel.Worker = worker;
            resultModel.WorkerId = worker.Id;
            return resultModel;
        }
    }
}
