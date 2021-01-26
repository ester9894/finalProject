using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
   public class AlertDTO
    {
        public long AlertId { get; set; }
        public long days { get; set; }
        public System.DateTime Date { get; set; }
        public bool IsActivated { get; set; }
        public long FollowUpListId { get; set; }
        public Nullable<long> ProductId { get; set; }
    }
}
