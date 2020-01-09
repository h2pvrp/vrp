using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NetTopologySuite.Geometries;

namespace VrpBackend.Models
{
    public class Case
    {
        public long Id { get; set; }
        public int VehicleCount { get; set; }
        public DateTime Timestamp { get; set; }
        public long UserId { get; set; }
        public MultiPoint Points { get; set; }
        public Point Base { get; set; }
        public long[] Results { get; set; }
    }
}
