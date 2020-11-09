using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
   public class ListForChangeDTO
    {
        public long accountId { get; set; }
        public List<ProductsDTO> listForChange { get; set; }
    }
}
