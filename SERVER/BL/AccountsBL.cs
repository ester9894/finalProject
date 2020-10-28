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
        public static long AddAccount(AccountDTO account)
        {
            long accountId;
            using (ProjectDBEntities db = new ProjectDBEntities())
            {
                if (db.Accounts.Any(a => a.AccountName.Equals(account.AccountName)))
                    //אם קיים חשבון עם אותו שם שולח הערה לשינוי שם חשבון
                    return 0;

           
                db.Accounts.Add(CONVERTERS.AccountConverter.ConvertAccountToDAL(account));
                db.SaveChanges();
                accountId= db.Accounts.Where(a => a.AccountName.Equals(account.AccountName) && a.Password.Equals(account.Password)).Select(a => a.AccountId).ToList()[0];
                return accountId;
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

        public static void addUserAccount(int userId, int accountId)
        {
            using (ProjectDBEntities db = new ProjectDBEntities())
            {
                db.UsersAccounts.Add(CONVERTERS.UserAccountConverter.ConvertUsersAccountToDAL(new UsersAccountDTO() { 
                AccountId=accountId,
               UserId=userId }));
                db.SaveChanges();
            }

        }

        public static long CheckPass(string password, string accountName)
        {
            string pass="", accountN="";
            long accountId;
            using (ProjectDBEntities db = new ProjectDBEntities())
            {
                if(db.Accounts.Any(a => a.Password.Equals(password)))
                     pass = db.Accounts.FirstOrDefault(a => a.Password.Equals(password)).Password;
                if(db.Accounts.Any(a => a.AccountName.Equals(accountName)))
                    accountN=db.Accounts.FirstOrDefault(a=>a.AccountName.Equals(accountName)).AccountName;
                if (db.Accounts.Any(a => a.Password.Equals(pass) && a.AccountName.Equals(accountN)))
                {
                    accountId = db.Accounts.Where(a => a.Password.Equals(pass) && a.AccountName.Equals(accountN)).Select(a => a.AccountId).ToList()[0];
                    return accountId;
                }
                return 0;
            }
        }
    }
}
