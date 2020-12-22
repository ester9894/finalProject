using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class ProductToListDTO
    {
        public long ProductToListId_ { get; set; }
        public long ProductId { get; set; }
        public string ProductName { get; set; }
        public long ListId { get; set; }
        public long? BuyerId { get; set; }
        public System.DateTime? DateOfBuy { get; set; }
        public int? Amount { get; set; }
    }
}
