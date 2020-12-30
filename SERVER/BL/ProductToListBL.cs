using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;

namespace BL
{
   public class ProductToListBL
    {
        public static void AddProductsToList(BuyListDTO buyList)
        {
            using (ProjectDBEntities db = new ProjectDBEntities())
            {
                foreach (var pr in buyList.Products)
                {
                    var prod = db.ProductToLists.FirstOrDefault(p => p.ProductToListId == pr.ProductToListId);
                    prod.BuyerId = buyList.UserId;
                    prod.DateOfBuy = DateTime.Now;
                    prod.Amount = pr.Amount;
                    db.SaveChanges();
                    var follow = db.FollowUpLists.Include(p => p.Frequency).FirstOrDefault(f => f.ProductId == prod.ProductId);
                    if (follow!=null)
                    {
                        BL.FollowUpBL.SetFrequency(follow);    
                    }
                }

            }
        }
    }
}
