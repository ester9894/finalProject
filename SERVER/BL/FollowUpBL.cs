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

            using (ProjectDBEntities db = new ProjectDBEntities())
            {
             Dictionary<string, List<FollowUpListDTO>> d = db.FollowUpLists.Where(f => f.AccountId == id).ToList().
                    GroupBy(p => p.Product.Category.CategoryName)
                    .ToDictionary(p => p.Key, p => p.Select(item => CONVERTERS.FollowUpListConverter.ConvertFollowUpListToDTO(item)).ToList());
                return d;

            }
        }

        public static void removeProductsFromFollowUp(int[] idSelectedProducts, int accountId)
        {
            using (ProjectDBEntities db = new ProjectDBEntities())
            {
                foreach (int item in idSelectedProducts)
                {
                    FollowUpList f = new FollowUpList();
                    if (db.FollowUpLists.Any(a => a.AccountId == accountId && a.ProductId == item))
                    {
                        f = db.FollowUpLists.FirstOrDefault(a => a.AccountId == accountId && a.ProductId == item);
                        db.FollowUpLists.Remove(f);
                    }
                }
                db.SaveChanges();
            }
        }

        public static void SetFrequency(FollowUpList follow)
        {
            using (ProjectDBEntities db = new ProjectDBEntities())
            {
                
               
               List<ProductToList> lastBuys= db.ProductToLists.
                    Where(p =>p.DateOfBuy!=null&& p.ProductId == follow.ProductId && p.List.TypesList.AccountId == follow.AccountId).
                    OrderByDescending(p => p.DateOfBuy).ToList();
                var daysbefore = follow.Frequency.NumDays - follow.Frequency.Exception; // חריגה לפני
                var daysafter = follow.Frequency.NumDays + follow.Frequency.Exception;//חריגה אחרי
                var rangeDates = (lastBuys[0].DateOfBuy - lastBuys[1].DateOfBuy).Value.TotalDays;//הפרש בין התאריכים האחרונים
                if (follow.Frequency!=null&&lastBuys.Count>=2&&(rangeDates >= daysbefore && rangeDates <= daysafter)) { 
                
                
                }
                    


           
            }
        }

   }
}
