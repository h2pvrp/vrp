using System.Collections.Generic;


namespace VrpBackend.Models 
{
    public class Route 
    {
        public long Id { get; set; }
        public double Distance { get; set; }
        public List<Point> Path { get; set; }

        public long SolutionId { get; set; }
        public Solution Solution { get; set; }
    }
}
