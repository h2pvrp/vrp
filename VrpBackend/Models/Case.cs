using System.Collections.Generic;


namespace VrpBackend.Models 
{
    public class Case 
    {
        public long Id {get; set;}
        public Point Base { get; set; }
        public int VehicleCount { get; set; }
        public List<Point> Points { get; set; }
    }
}
