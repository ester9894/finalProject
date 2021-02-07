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
                foreach (int item in idSelectedProducts)
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
                int daysbefore=0, daysafter=0;
                double rangeDates = 0;
                //lastbuys שולף את כל הפעמים שנקנה המוצר וממין מהתאריך קנייה האחרון ומטה
                List<ProductToList> lastBuys = db.ProductToLists.
                     Where(p => p.DateOfBuy != null && p.ProductId == follow.ProductId && p.List.TypesList.AccountId == follow.AccountId).
                     OrderByDescending(p => p.DateOfBuy).ToList();
                //אם מעודכן תדירות כבר למוצר, מחשב את הזמנים שאפשר לחרוג בקניית המוצר 
                if(follow.Frequency!=null)
                {
                     daysbefore = follow.Frequency.NumDays - follow.Frequency.Exception; // חריגה לפני
                     daysafter = follow.Frequency.NumDays + follow.Frequency.Exception;//חריגה אחרי
                }
                // אם קנה מוצר זה יותר מפעמיים אז מחשב את הפרש זמן הקנייה מהקנייה העכשוית לקניה הקודמת לה
                if(lastBuys.Count>=2)
                {
                    rangeDates = (lastBuys[0].DateOfBuy - lastBuys[1].DateOfBuy).Value.TotalDays;
                }
                // אם תקין- קיימת תדירות ויש יותר וקנה את המוצר יותר מ 3 םעמים וגם קניית המוצר עכשיו היא עדיין בטווח החריגה או שבכלל אין תדירות עדיין
                if ((follow.Frequency != null && lastBuys.Count >= 3 && rangeDates >= daysbefore && rangeDates <= daysafter) ||
                    lastBuys.Count < 3)
                {
                    return;
                }
                // מחשב הפרשי קנייה של 3 הפעמים האחרונות שקנה את המוצר
                int[] differences = new int[2];
                for (int i = 0; i < 2; i++)
                {
                    differences[i] = (int)(lastBuys[i].DateOfBuy - lastBuys[i + 1].DateOfBuy).Value.TotalDays;//הפרש בין התאריכים האחרונים
                }
                // בודק אם ההפרשים נמצאים באחד מהטווחים הנתונים כבר
                foreach (var frequency in db.Frequencies)
                {
                    int i = 0;
                    for (; i < 2; i++)
                    {
                        if(! (IsNumberInFreequencyRange(differences[i], frequency)))
                            break;
                    }
                    if (i < 2)
                        continue;
                    // אם כל ההפרשים מקיימים את אחד מהטווחים מעדכן את התדירות למוצר זה
                    db.FollowUpLists.FirstOrDefault(f => f.FollowUpListId == follow.FollowUpListId).FrequencyId = frequency.FrequencyId;
                    //frequency.FrequencyId;
                    break;
                }
                db.SaveChanges();
            }
        }

        public static void CreateAlertsForAccount(long accountId)
        {
            using (ProjectDBEntities db = new ProjectDBEntities())
            {
                Account account = db.Accounts.FirstOrDefault(a => a.AccountId == accountId);
                var productList = account.TypesLists.SelectMany(l => l.Lists).SelectMany(p => p.ProductToLists.Where(d => d.DateOfBuy != null)).OrderByDescending(d => d.DateOfBuy).ToList();
                //  var followList =  db.FollowUpLists.Where(a => a.AccountId == accountId).ToList();
                foreach (var follow in account.FollowUpLists.ToList())//עובר על המוצרים למעקב של חשבון זה
                {
                    if (follow.FrequencyId == null)//אם אין לו תדירות לא בודק אותו
                        continue;
                    var lastBuy = productList.FirstOrDefault(p => p.ProductId == follow.ProductId);//קניה אחרונה של המוצר הנוכחי
                    int days = (int)(DateTime.Today - lastBuy.DateOfBuy).Value.TotalDays;//הימים שעברו מאז הקניה האחרונה
                    var specificProduct = productList.Where(p => p.ProductId == follow.ProductId).ToList();//לברר מה זה!!!!!!!!!
                    double avg = GetAvgBuy(specificProduct, follow.Frequency);// מציאת ממוצע הקניות לפי התדירות
                    double dayAvg = avg / follow.Frequency.NumDays;
                    if (days == 0)//אני הוספתי את זה!!!!!!!
                        continue;
                    if (lastBuy.Amount / days >= dayAvg)//אם הוא קנה בקניה האחרונה מעל הממוצע לא מתריע אותו
                        continue;
                        //if (follow.Frequency.NumDays > days)
                        //continue;
                    var alert = db.Alerts.FirstOrDefault(a => a.FollowUpListId == follow.FollowUpListId);//מחפש התראה על המוצר הנוכחי
                    if (alert == null)//DB אם אין לו התראה ב  
                    {
                        db.Alerts.Add(//יוצר לו התראה
                            new Alert
                            {
                                Date = DateTime.Now,
                                FollowUpListId = follow.FollowUpListId,
                                IsActivated = true,
                                days = days,
                                ProductId = follow.ProductId

                            });
                        db.SaveChanges();
                    }
                    else// אם יש לו התראה
                    {
                        alert.days = days;
                        if (alert.days / follow.Frequency.NumDays >= 3)//אם לא קנה 3 פעמים בתדירות המוגדרת
                        {
                            follow.FrequencyId = 0;//מאפסים את התדירות
                            db.Alerts.Remove(alert);//ומוחקים את ההתראה
                            db.SaveChanges();
                            continue;
                        }

                        if (alert.IsActivated == false && alert.days % follow.Frequency.NumDays == 0)//אם ההתראה במצב התעלמות והגיע תאריך התדירות
                        {
                            alert.IsActivated = true;//מפעיל את ההתראה
                            db.SaveChanges();
                        }


                    }
                }

            }
        }

        private static double GetAvgBuy(List<ProductToList> products, Frequency frequency)
        {
            for (int i = 0; i < products.Count - 2; i++)
            {
                if (IsNumberInFreequencyRange(GetNumDays(products[i + 2].DateOfBuy.Value, products[i + 1].DateOfBuy.Value), frequency) &&
               IsNumberInFreequencyRange(GetNumDays(products[i + 1].DateOfBuy.Value, products[i].DateOfBuy.Value), frequency))
                {
                    return (double)(products[i + 2].Amount + products[i + 1].Amount + products[i].Amount) / 3;
                }
            }
            return -1;
        }

        private static int GetNumDays(DateTime end, DateTime start)
        {
            return (int)(end - start).TotalDays;
        }

        private static bool IsNumberInFreequencyRange(int num, Frequency frequency)
        {
            int daysbefore = frequency.NumDays - frequency.Exception; // חריגה לפני
            int daysafter = frequency.NumDays + frequency.Exception; //חריגה אחרי

            return num >= daysbefore && num <= daysafter;
        }

        //מחזיר את רשימת המוצרים לחשבון שצריך להתריע עליהם
        public static List<AlertDTO> GetAlertsForAccount(int accountId)
        {
            using (ProjectDBEntities db = new ProjectDBEntities())

            {
                return db.Alerts.Where(p => p.FollowUpList.AccountId == accountId && p.IsActivated == true).ToList().Select(p=>CONVERTERS.AlertConverter.ConvertAlertToDTO(p)).ToList();
            }
        }
        public static void CancelAlertOfProduct(AlertDTO alert)
        {
            using (ProjectDBEntities db = new ProjectDBEntities())
            {
                  Alert alert1 = new Alert();
                  alert1 = db.Alerts.FirstOrDefault(a => a.AlertId == alert.AlertId);
                alert1.IsActivated = false;
            //    db.alerts.remove(alert1);
                   db.SaveChanges();
            }
        }
        
    }
}
