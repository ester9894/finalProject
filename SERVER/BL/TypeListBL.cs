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
   {/// <summary>
   /// מחזירה את כל סוגי הרשימות של קוד החשבון שנשלח
   /// </summary>
   /// <param name="accountId"></param>
   /// <returns></returns>
        public static List<TypeListDTO> GetAllTypesList(long accountId)
        {
            using (ProjectDBEntities db = new ProjectDBEntities())
            {
                return CONVERTERS.TypeListConverter.ConvertTypeListListToDTO(db.TypesLists.Where(a => a.AccountId == accountId).ToList());
            }
        }
        /// <summary>
        /// שמירת סוג רשימה חדש לחשבון מסוים
        /// </summary>
        /// <param name="accountId"></param>
        /// <param name="listForChange"></param>
        /// <returns></returns>
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
        /// <summary>
        /// הוספת מוצרים לסוג רשימה
        /// </summary>
        /// <param name="typeList"></param>
        /// <param name="listForChange"></param>
        /// <returns></returns>
        public static bool addProductsForList(TypesList typeList, ListForChangeDTO listForChange)
        {
            using (ProjectDBEntities db = new ProjectDBEntities())
            {
                foreach (int id in listForChange.idProductsList)
                {
                    if (id != 0)
                    {
                        ProductsToTypeList p = new ProductsToTypeList();
                        p.TypeListId = db.TypesLists.FirstOrDefault(type => type.TypeListName == typeList.TypeListName && type.AccountId == typeList.AccountId).TypeListId;
                        p.Amount = 1;
                        p.ProductId = id;
                        db.ProductsToTypeLists.Add(p);
                    }
                }
                db.SaveChanges();
                return true;
            }
        }
   }
}
