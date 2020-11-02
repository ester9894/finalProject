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
                // .Values.Select(list => list.Select(item => CONVERTERS.FollowUpListConverter.ConvertFollowUpListToDTO(item)));
                return d;

            }
        }
    }
}
