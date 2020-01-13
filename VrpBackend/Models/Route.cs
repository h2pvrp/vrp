using System.Collections.Generic;


namespace VrpBackend.Models 
{
    public class Route 
    {
        public double Distance { get; set; }
        public List<Point> Path { get; set; }
    }
}
