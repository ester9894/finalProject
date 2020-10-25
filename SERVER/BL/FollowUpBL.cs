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
        public static void AddFollowUp(int[] idSelectedProducts)
        {
            using (ProjectDBEntities db = new ProjectDBEntities())
            {
                foreach(int item in idSelectedProducts)
                {
                    FollowUpListDTO f = new FollowUpListDTO();
                    f.ProductId = item;
                    db.FollowUpLists.Add(CONVERTERS.FollowUpListConverter.ConvertFollowUpListToDAL(f));

                }
                db.SaveChanges();
            }
        }
    }
}
