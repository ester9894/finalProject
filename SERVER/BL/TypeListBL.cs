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

        public static bool SaveList(int accountId, ListForChangeDTO listForChange)
        {
            using (ProjectDBEntities db = new ProjectDBEntities())
            {

                TypesList typeList = new TypesList();
                if (db.TypesLists.FirstOrDefault(a => a.AccountId == accountId && a.TypeListName == listForChange.NameList) == null)
                {
                   typeList.TypeListName = listForChange.NameList;
                   typeList.AccountId = accountId;
                   db.TypesLists.Add(typeList);
                   ProductsToTypeList p = new ProductsToTypeList();
                   foreach (int id in listForChange.idProductsList)
                   {
                       p.Amount = 0;
                       p.ProductId = id;
                       typeList.ProductsToTypeLists.Add(p);
                   }
                }
                else { return false; }
                db.SaveChanges();
                return true;
            }
        }
    }
}
