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
                }
                else { return false; }
                db.SaveChanges();
                if (listForChange.idProductsList != null)
                    addProductsForList(typeList, listForChange);
                return true;
            }
        }

        public static bool addProductsForList(TypesList typeList, ListForChangeDTO listForChange)
        {
            using (ProjectDBEntities db = new ProjectDBEntities())
            {
                foreach (int id in listForChange.idProductsList)
                {
                    ProductsToTypeList p = new ProductsToTypeList();
                    p.TypeListId = db.TypesLists.FirstOrDefault(type => type.TypeListName == typeList.TypeListName && type.AccountId == typeList.AccountId).TypeListId;
                    p.Amount = 0;
                    p.ProductId = id;
                    db.ProductsToTypeLists.Add(p);
                }
                db.SaveChanges();
                return true;
            }
        }
   }
}
