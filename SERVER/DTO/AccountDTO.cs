using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class AccountDTO
    {
        public long AccountId { get; set; }
        public string AccountName { get; set; }
        public string Password { get; set; }
        public long ManagerId { get; set; }
    }
}
