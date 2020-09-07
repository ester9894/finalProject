using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class FrequencyDTO
    {
        public long FrequencyId { get; set; }
        public string FrequencyMode { get; set; }
        public int NumDays { get; set; }
        public int Exception { get; set; }
    }
}
