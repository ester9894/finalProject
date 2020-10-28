using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class ProductsToTypeListDTO
    {
        public long ProductId { get; set; }
        public string ProductName { get; set; }
        public long TypeListId { get; set; }
        public int Amount { get; set; }
    }
}
