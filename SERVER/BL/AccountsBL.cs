using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
   public class AccountsBL
    {
        public static void AddAccount(AccountDTO account)
        {
            using (ProjectDBEntities db = new ProjectDBEntities())
            {
                db.Accounts.Add(CONVERTERS.AccountConverter.ConvertAccountToDAL(account));
                db.SaveChanges();
            }
        }
    }
}
