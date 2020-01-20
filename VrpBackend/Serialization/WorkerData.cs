using System.Collections.Generic;

using VrpBackend.Models;


namespace VrpBackend.Serialization
{
    public class WorkerData
    {
        public string Name { get; set; }
        public string Host { get; set; }
        public int Port { get; set; }
        public string Endpoint { get; set; }

        public string Url() => $"{Host}:{Port}{Endpoint}";
    }
}
