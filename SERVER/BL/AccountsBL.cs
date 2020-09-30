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

        public static bool checkLogin(LoginDTO login)
        {
            User user;
            Account account;
            using (ProjectDBEntities db = new ProjectDBEntities())
            {
               user = db.Users.FirstOrDefault(a => a.UserName == login.userName);
                if (user == null)
                    return false;
                long userId = user.UserId;
               account = db.Accounts.FirstOrDefault(a => a.Password == login.userPassword);
                if (account == null)
                    return false;
                long accountId = account.AccountId;
                if (db.UsersAccounts.FirstOrDefault(a => a.UserId == userId && a.AccountId == accountId)!= null)
                    return true;
                else
                    return false;
            }

        }
    }
}
