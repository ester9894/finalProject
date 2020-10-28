using DAL;
using DTO;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
   public class FollowUpBL
    {
        public static void AddFollowUp(int[] idSelectedProducts, int idAccount)
        {
            using (ProjectDBEntities db = new ProjectDBEntities())
            {
                foreach(int item in idSelectedProducts)
                {
                    FollowUpListDTO f = new FollowUpListDTO();
                    if (!db.FollowUpLists.Any(a => a.AccountId == idAccount && a.ProductId == item))
                    {
                        f.ProductId = item;
                        f.AccountId = idAccount;
                        db.FollowUpLists.Add(CONVERTERS.FollowUpListConverter.ConvertFollowUpListToDAL(f));
                    }
                }
                db.SaveChanges();
            }
        }

        public static Dictionary<string, List<FollowUpListDTO>> GetListById(int id)
        {
            List<FollowUpList> listById = new List<FollowUpList>();
            List<Product> listByIdsAsProduct = new List<Product>();
            using (ProjectDBEntities db = new ProjectDBEntities())
            {
                Dictionary<string, List<FollowUpListDTO>> d = new Dictionary<string, List<FollowUpListDTO>>();
                return d;
               //return db.FollowUpLists.Where(f => f.AccountId == id).ToList().
               //     GroupBy(p => p.Product.Category.CategoryName)
               //     .ToDictionary(p => p.Key, p => p.ToList())
               //     .Values.Select(list => list.Select(item=> CONVERTERS.FollowUpListConverter.ConvertFollowUpListToDTO(item));

              // listById = (List<FollowUpList>)db.FollowUpLists.Select(item => item.AccountId == id);// get all items contact specific id
              // listById.ForEach(item=> listByIdsAsProduct.Add((Product)db.Products.ToList().Select(a => a.ProductId == item.ProductId)));// take items and cast tham to products
              //  return listByIdsAsProduct.Select(p => CONVERTERS.ProductsConverter.ConvertProductToDTO(p)).GroupBy(p => p.CategoryName).ToDictionary(p => p.Key, p => p.ToList());
              ////  return db.FollowUpLists.Select(p => CONVERTERS.FollowUpListConverter.ConvertFollowUpListToDTO(p)).ToList();
            }
        }
    }
}
