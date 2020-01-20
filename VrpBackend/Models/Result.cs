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
        public double ComputationTime { get; set; }
        public double CombinedLength { get; set; }
        public double LongestRouteLength { get; set; }
        public double LongestRouteTime { get; set; }
        public int NumberOfRoutes { get; set; }

        public long CaseId { get; set; }
        public Case Case { get; set; }
        public long WorkerId { get; set; }
        public Worker Worker { get; set; }
    }
}
