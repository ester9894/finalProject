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
            {//משנה את פרטי המוצר לפי הקניה ושולח לעדכון התדירות של קנייתו
                foreach (var pr in buyList.Products)
                {
                    var prod = db.ProductToLists.FirstOrDefault(p => p.ListId == buyList.ListId && p.ProductId == pr.ProductId);
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

        public static void SaveOneProductsToList(int accountId, ProductToListDTO[] products)
        {
            using (ProjectDBEntities db = new ProjectDBEntities())
            {
                Account account = db.Accounts.FirstOrDefault(a => a.AccountId == accountId);
                List list = account.TypesLists.SelectMany(l => l.Lists).FirstOrDefault(li=> li.ListId == products[0].ListId);
                foreach (var pr in products)
                {
                    if (list.ProductToLists.FirstOrDefault(l => l.ProductId == pr.ProductId) == null)
                    {
                    ProductToList productToList = new ProductToList();
                    productToList.ListId = pr.ListId;
                    productToList.ProductId = pr.ProductId;
                        productToList.Amount = 1;
                    list.ProductToLists.Add(productToList);
                    }
                    db.SaveChanges();
                }

            }
        }

    }
}
