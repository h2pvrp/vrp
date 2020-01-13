using System.Collections.Generic;


namespace VrpBackend.Models 
{
    public class Solution 
    {
        public long Id { get; set; }

        public List<Route> Routes { get; set; }        
        public long CaseId { get; set; }
        public Case Case { get; set; }
        public long WorkerId { get; set; }
        public Worker Worker { get; set; }
    }
}
