using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class ListsBL
    {
        public static long AddList(ListDTO list)
        {// פונקציה המוסיפה קנייה חדשה למערכת ומחזירה את הרשימה 
            using (ProjectDBEntities db = new ProjectDBEntities())
            {
                list.StartDate = DateTime.Now;
                List newList = CONVERTERS.ListConverter.ConvertListToDAL(list);
                db.Lists.Add(newList);
                List<ProductToList> products = db.ProductsToTypeLists.Where(p => p.TypeListId == list.TypeListId).ToList().
                      Select(pl => new ProductToList { ProductId = pl.ProductId }).ToList();
                products.ForEach(p => newList.ProductToLists.Add(p));    
                db.SaveChanges();
                return db.Lists.OrderByDescending(product => product.StartDate).Take(1).ToList()[0].ListId;
            }
        }

        /// <summary>
        /// פונקציה המחזירה את רשימת המוצרים שעוד לא נקנו לקניה מסויימת
        /// </summary>
        /// <param name="listId"></param>
        public static List<ProductToListDTO> GetProductsOfBuyList(long listId)
        {
            using (ProjectDBEntities db = new ProjectDBEntities())
            {
                var prods = db.ProductToLists.Where(p => p.ListId == listId && p.DateOfBuy == null).ToList();
                prods.ForEach( p=>p.Amount=p.List.TypesList.ProductsToTypeLists.FirstOrDefault(pr=>pr.ProductId==p.ProductId).Amount);
                return CONVERTERS.ProductToListConverter.ConvertProductToListToDTO(prods);
            }
        }

        /// <summary>
        /// פונקציה המחזירה את כל הרשימות שעוד לא הושלמו קנייתם
        /// </summary>
        /// <param name="accountId"></param>
        public static List<ListDTO> GetActiveLists(int accountId)
        {
            using (ProjectDBEntities db = new ProjectDBEntities())
            {
              return CONVERTERS.ListConverter.ConvertArrayListToDTO(db.Lists.Where(list => list.TypesList.AccountId == accountId && list.EndDate != null && list.EndDate >= DateTime.Today && list.ProductToLists.Count(p=> p.DateOfBuy == null)>0).ToList());
            }
        }
    }
  }
