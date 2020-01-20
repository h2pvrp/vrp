using System.Collections.Generic;

using VrpBackend.Models;


namespace VrpBackend.Serialization
{
    public class ResultData: ModelData<Result>
    {
        public long Id { get; set; }
        public List<List<double[]>> Routes { get; set; }        
        public double ComputationTime { get; set; }
        public double CombinedLength { get; set; }
        public double LongestRouteLength { get; set; }
        public double LongestRouteTime { get; set; }
        public int NumberOfRoutes { get; set; }

        public long WorkerId { get; set; }
        public Worker Worker { get; set; }
        public long CaseId { get; set; }
        public ResultData()
        {}

        public ResultData(Result result)
        {
            Id = result.Id;
            Routes = MultiLineStringSerialize(result.Routes);
            ComputationTime = result.ComputationTime;
            CombinedLength = result.CombinedLength;
            LongestRouteLength = result.LongestRouteLength;
            LongestRouteTime = result.LongestRouteTime;
            NumberOfRoutes = result.NumberOfRoutes;
            WorkerId = result.WorkerId;
            Worker = result.Worker;
            CaseId = result.CaseId;
        }

        public override Result ToModel()
        {
            return new Result()
            {
                Id = this.Id,
                Routes = MultiLineStringFactory(this.Routes),
                ComputationTime = this.ComputationTime,
                CombinedLength = this.CombinedLength,
                LongestRouteLength = this.LongestRouteLength,
                LongestRouteTime = this.LongestRouteTime,
                NumberOfRoutes = this.NumberOfRoutes,
                WorkerId = this.WorkerId,
                Worker = this.Worker,
                CaseId = this.CaseId,
            };
        }
    }
}
