using System;
using System.Collections.Generic;

using VrpBackend.Models;


namespace VrpBackend.Serialization
{
    public class CaseData: ModelData<Case>
    {   
        public long Id { get; set; }
        public int VehicleCount { get; set; }
        public List<double[]> Points { get; set; }
        public double[] Base { get; set; }

        public CaseData()
        {}

        public CaseData(Case c)
        {
            Id = c.Id;
            VehicleCount = c.VehicleCount;
            Points = MultiPointSerialize(c.Points);
            Base = PointSerialize(c.Base);
        }

        public override Case ToModel()
        {
            return new Case()
            {
                Id = this.Id,
                VehicleCount = this.VehicleCount,
                Points = MultiPointFactory(this.Points),
                Base = PointFactory(this.Base)
            };
        }
    }
}
