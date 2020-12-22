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
        public static void AddList(ListDTO list)
        {
            using (ProjectDBEntities db = new ProjectDBEntities())
            {
                list.StartDate = DateTime.Now;
                List newList = CONVERTERS.ListConverter.ConvertListToDAL(list);
                newList.ProductToLists.ToList().AddRange(db.ProductsToTypeLists.Where(p => p.TypeListId == list.TypeListId).ToList().
                      Select(pl => new ProductToList { ProductId = pl.ProductId }));
                
                db.SaveChanges();
                
            }
        }

        /// <summary>
        /// פונקציה המחזירה את רשימת המוצרים לקניה מסויימת
        /// </summary>
        /// <param name="listId"></param>
        public static List<ProductToListDTO> BuyList(long listId)
        {
            using (ProjectDBEntities db = new ProjectDBEntities())
            {
                var prods = db.ProductToLists.Where(p => p.ListId == listId && p.DateOfBuy == null).ToList();
                prods.ForEach(
                    p=>p.Amount=p.List.TypesList.ProductsToTypeLists.FirstOrDefault(pr=>pr.ProductId==p.ProductId).Amount);
                
                return CONVERTERS.ProductToListConverter.ConvertProductToListToDTO(prods);
            }
        }




    }
  }
