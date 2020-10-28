using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
   public class TypeListBL
   {
        public static List<TypeListDTO> GetAllTypesList(long accountId)
        {
            using (ProjectDBEntities db = new ProjectDBEntities())
            {
                return CONVERTERS.TypeListConverter.ConvertTypeListListToDTO(db.TypesLists.Where(a => a.AccountId == accountId).ToList());
            }
        }
   }
}
