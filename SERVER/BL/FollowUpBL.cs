using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
   public class FollowUpBL
    {
        public static void AddFollowUp(FollowUpListDTO followUp)
        {
            using (ProjectDBEntities db = new ProjectDBEntities())
            {
                db.FollowUpLists.Add(CONVERTERS.FollowUpListConverter.ConvertFollowUpListToDAL(followUp));
                db.SaveChanges();
            }
        }
    }
}
