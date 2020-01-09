using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NetTopologySuite.Geometries;

namespace VrpBackend.Models
{
    public class Result
    {
        public long Id { get; set; }
        public MultiLineString Routes { get; set; }
        public long WorkerId { get; set; }
        
        // TODO: Stats JSON
        public Worker Worker { get; set; }
    }
}
