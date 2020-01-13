using System.Collections.Generic;


namespace VrpBackend.Models
{
    public class Worker 
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public bool Active { get; set; } = true;
        public string Host { get; set; } = "http://localhost";
        public int Port { get; set; }
        public string Endpoint { get; set; } = "/";

        public List<Result> Results { get; set; }

        public string Url() => $"{Host}:{Port}{Endpoint}";
    }
}
