using System.Collections.Generic;

using VrpBackend.Models;


namespace VrpBackend.Serialization
{
    public class ResultData: ModelData<Result>
    {
        public long Id { get; set; }
        public decimal Distance { get; set; }
        public List<List<double[]>> Routes { get; set; }
        public long WorkerId { get; set; }
        public Worker Worker { get; set; }

        public ResultData()
        {}

        public ResultData(Result result)
        {
            Id = result.Id;
            Distance = result.Distance;
            Routes = MultiLineStringSerialize(result.Routes);
            WorkerId = result.WorkerId;
            Worker = result.Worker;
        }

        public override Result ToModel()
        {
            return new Result()
            {
                Id = this.Id,
                Distance = this.Distance,
                Routes = MultiLineStringFactory(this.Routes),
                WorkerId = this.WorkerId,
                Worker = this.Worker
            };
        }
    }
}
