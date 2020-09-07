using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class FollowUpListDTO
    {
        public long FollowUpListId { get; set; }
        public long ProductId { get; set; }
        public Nullable<int> Amount { get; set; }
        public Nullable<long> FrequencyId { get; set; }
    }
}
