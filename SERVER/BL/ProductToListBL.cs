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
        public static void AddProductsToList(long listId,long buyerId,List<ProductToListDTO> products)
        {
            using (ProjectDBEntities db = new ProjectDBEntities())
            {
                foreach (var pr in products)
                {
                    var prod = db.ProductToLists.FirstOrDefault(p => p.ProductToListId_ == pr.ProductToListId_);
                    prod.BuyerId = buyerId;
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
