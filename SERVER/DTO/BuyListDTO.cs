using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class BuyListDTO
    {
        public int UserId { get; set; }
        public int TypeListId { get; set; }
        public ProductToListDTO[] Products { get; set; }
    }
}
