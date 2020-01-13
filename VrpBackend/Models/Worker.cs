using System.Collections.Generic;


namespace VrpBackend.Models
{
    public class Worker 
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public bool Active { get; set; }
        public string Host { get; set; }
        public int Port { get; set; }
        public string Endpoint { get; set; } 

        public List<Solution> Solutions { get; set; }

        public string Url() => $"{Host}:{Port}{Endpoint}";
    }
}
