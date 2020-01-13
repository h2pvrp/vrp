using System.Net.Http;


namespace VrpBackend.Workers
{
    public class DummyWorker: WorkerService
    {
        public override string Url => "http://localhost:5005/";

        public DummyWorker(HttpClient client): base(client)
        {}
    } 
}
