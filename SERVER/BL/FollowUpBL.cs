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
        /// <summary>
        /// הוספת מוצרים לרשימת המוצרים למעקב על פי בחירת המשתמש לחשבון
        /// </summary>
        /// <param name="idSelectedProducts"></param>
        /// <param name="idAccount"></param>
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
                var removedItems = db.FollowUpLists.Where(p => !idSelectedProducts.Any(p2 => p2 == p.ProductId) && p.AccountId == idAccount).ToList();
                db.FollowUpLists.RemoveRange(removedItems);
                db.SaveChanges();
            }
        }
        /// <summary>
        ///  מחזירה רשימת מעקב ממויינת על פי קטגוריות לחשבון מסויים
        ///  /// </summary>
        /// <param name="accountId"></param>
        /// <returns></returns>
        public static Dictionary<string, List<FollowUpListDTO>> GetListById(int accountId)
        {

            using (ProjectDBEntities db = new ProjectDBEntities())
            {
             Dictionary<string, List<FollowUpListDTO>> d = db.FollowUpLists.Where(f => f.AccountId == accountId).ToList().
                    GroupBy(p => p.Product.Category.CategoryName)
                    .ToDictionary(p => p.Key, p => p.Select(item => CONVERTERS.FollowUpListConverter.ConvertFollowUpListToDTO(item)).ToList());
                return d;

            }
        }
        /// <summary>
        /// רשימת מעקב ממוינת לפי קטגוריות
        /// </summary>
        /// <param name="accountId"></param>
        /// <returns></returns>
        public static List<ProductsDTO>[] GetSortedFolowList(int accountId)
        {
            using (ProjectDBEntities db = new ProjectDBEntities())
            {
                int index = 0;
                int numCategories = db.Categories.Count();
                List<ProductsDTO>[] selectedProductsByCategory = new List<ProductsDTO>[numCategories];
                var usersProducts = db.FollowUpLists.Where(a => a.AccountId == accountId).Select(f => f.Product).GroupBy(p => p.CategoryId).ToDictionary(p => p.Key, p => p.ToList());
                int numUsersCategories = usersProducts.Count;
                var allCategories = db.Categories.ToList();
                for (int i = 0; i < numCategories; i++)
                {
                    if (index < numUsersCategories && allCategories[i].CategoryId == usersProducts.ElementAt(index).Key)
                        selectedProductsByCategory[i] = usersProducts.ElementAt(index++).Value.Select(p => CONVERTERS.ProductsConverter.ConvertProductToDTO(p)).ToList();
                    else
                        selectedProductsByCategory[i] = new List<ProductsDTO>();

                }
                return selectedProductsByCategory;
            }

        }
        /// <summary>
        /// מחיקת מוצר מרשימת המעקב
        /// </summary>
        /// <param name="idSelectedProducts"></param>
        /// <param name="accountId"></param>
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
        /// <summary>
        /// הגדרת תדירות למוצר ועדכונה כל קניה 
        /// </summary>
        /// <param name="follow"></param>
        public static void SetFrequency(FollowUpList follow)

        {
            using (ProjectDBEntities db = new ProjectDBEntities())
            {
               List<ProductToList> lastBuys= db.ProductToLists.
                    Where(p =>p.DateOfBuy!=null&& p.ProductId == follow.ProductId && p.List.TypesList.AccountId == follow.AccountId).
                    OrderByDescending(p => p.DateOfBuy).ToList();
                if(follow.Frequency != null)
                {
                    var daysbefore = follow.Frequency.NumDays - follow.Frequency.Exception; // חריגה לפני
                    var daysafter = follow.Frequency.NumDays + follow.Frequency.Exception;//חריגה אחרי
                }

                var rangeDates = (lastBuys[0].DateOfBuy - lastBuys[1].DateOfBuy).Value.TotalDays;//הפרש בין התאריכים האחרונים
                if ((follow.Frequency!=null&&lastBuys.Count>=3&&rangeDates >= daysbefore && rangeDates <= daysafter) ||
                    lastBuys.Count < 3 )
                { 
                   return;
                }
                int[] differences = new int[2];
                for (int i = 0; i < 2; i++)
                {
                     differences[i]= (int)(lastBuys[i].DateOfBuy - lastBuys[i+1].DateOfBuy).Value.TotalDays;//הפרש בין התאריכים האחרונים
                }

                foreach (var frequency in db.Frequencies)
                {
                    int i = 0;
                     daysbefore =frequency.NumDays - frequency.Exception; // חריגה לפני
                     daysafter = frequency.NumDays + frequency.Exception; //חריגה אחרי
                    for (; i < 2; i++)
                    {
                        if (!(differences[i] >= daysbefore && differences[i] <= daysafter))
                            break;
                    }
                    if (i < 2)
                        continue;

                    db.FollowUpLists.FirstOrDefault(f=>f.FollowUpListId==follow.FollowUpListId).FrequencyId = frequency.FrequencyId;
                    db.SaveChanges();
                    break;
                }
            }
        }

        public static void CreateAlertsForAccount(long accountId)
        {
            using (ProjectDBEntities db = new ProjectDBEntities())
            {
                Account account = db.Accounts.FirstOrDefault(a => a.AccountId == accountId);
                var productList = account.TypesLists.SelectMany(l => l.Lists).SelectMany(p => p.ProductToLists.Where(d=>d.DateOfBuy!=null)).OrderByDescending(d=>d.DateOfBuy).ToList();
             //  var followList =  db.FollowUpLists.Where(a => a.AccountId == accountId).ToList();
                foreach (var follow in account.FollowUpLists.ToList())
                {
                    var lastBuy = productList.FirstOrDefault(p => p.ProductId == follow.ProductId);
                    int days=(int) (DateTime.Today - lastBuy.DateOfBuy).Value.TotalDays;

                    if (follow.Frequency.NumDays > days)
                        continue;

                    db.Alerts.Add(
                        new Alert
                        {
                            Date=DateTime.Today,
                            FollowUpListId=follow.FollowUpListId,
                            IsActivated=true,
                            days= days,
                            ProductId = follow.ProductId

                        });  
                }

            }

            }

   }
}
