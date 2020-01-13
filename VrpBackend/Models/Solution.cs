using System.Collections.Generic;


namespace VrpBackend.Models 
{
    public class Solution 
    {
        public long Id { get; set; }
        //public long CaseId { get; set; }
        public List<Route> Routes { get; set; }
    }
}
