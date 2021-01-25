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
        /// <summary>
        /// הוספת חשבון חדש
        /// </summary>
        /// <param name="account"></param>
        /// <returns></returns>
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
        /// <summary>
        /// פונקציה הבודקת אם שם משתמש וסיסמא קיימים במערכת
        /// </summary>
        /// <param name="login"></param>
        /// <returns></returns>
        public static UsersAccountDTO checkLogin(LoginDTO login)
        {
            User user;
            Account account;
            using (ProjectDBEntities db = new ProjectDBEntities())
            {
               user = db.Users.FirstOrDefault(a => a.UserName == login.userName);
                if (user == null)
                    return null;
                long userId = user.UserId;
               account = db.Accounts.FirstOrDefault(a => a.Password == login.userPassword);
                if (account == null)
                    return null;
                long accountId = account.AccountId;
                if (db.UsersAccounts.FirstOrDefault(a => a.UserId == userId && a.AccountId == accountId)!= null)
                    return CONVERTERS.UserAccountConverter.ConvertUsersAccountToDTO(db.UsersAccounts.FirstOrDefault
                        (a => a.UserId == userId && a.AccountId == accountId));
                else
                    return null;
            }
        }

        /// <summary>
        /// פונקציה המחזירה את חשבונותיו של משתמש מסויים
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public static List<AccountDTO> GetAllAccountsByUser(long userId)
        {
            List<long> accountsId = new List<long>();
            List<AccountDTO> accountsList = new List<AccountDTO>();
            Account account = new Account();
            long accountId=0;

            using (ProjectDBEntities db = new ProjectDBEntities())
            {
                accountsId = db.UsersAccounts.Where(u => u.UserId == userId).Select(u => u.AccountId).ToList();
                for (int i = 0; i < accountsId.Count; i++)
                {
                    accountId = accountsId[i];
                    account = db.Accounts.Where(a => a.AccountId == accountId).ToList()[0];
                    accountsList.Add(CONVERTERS.AccountConverter.ConvertAccountToDTO(account));
                }
            }
            return accountsList;
        }
        /// <summary>
        /// מחזירה חשבון על פי קוד חשבון
        /// </summary>
        /// <param name="accountId"></param>
        /// <returns></returns>
        public static AccountDTO GetAccount(long accountId)
        {
                using (ProjectDBEntities db = new ProjectDBEntities())
                {
                    return CONVERTERS.AccountConverter.ConvertAccountToDTO(db.Accounts.Where(a=>a.AccountId==accountId).ToList()[0]);
                }

            
        }
        /// <summary>
        /// פונקציה המקשרת בין משתמש לחשבון
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="accountId"></param>
        public static void addUserAccount(int userId, int accountId)
        {
            using (ProjectDBEntities db = new ProjectDBEntities())
            {
                if(db.UsersAccounts.FirstOrDefault(a=>a.UserId == userId && a.AccountId == accountId) == null)
                {
                    db.UsersAccounts.Add(CONVERTERS.UserAccountConverter.ConvertUsersAccountToDAL(new UsersAccountDTO()
                    {
                        AccountId = accountId,
                        UserId = userId
                    }));
                    db.SaveChanges();
                }
            }

        }
        /// <summary>
        ///פונקציה הבודקת אם קיים שם חשבון זה עם סיסמא זו, במידה שקיים מחזירה את קוד החשבון.
        /// </summary>
        /// <param name="password"></param>
        /// <param name="accountName"></param>
        /// <returns></returns>
        public static long CheckPassOfAccount(string password, string accountName)
        {
            long accountId;
            using (ProjectDBEntities db = new ProjectDBEntities())
            {
                  if (db.Accounts.Any(a => a.Password.Equals(password) && a.AccountName.Equals(accountName)))
                {
                    accountId = db.Accounts.Where(a => a.Password.Equals(password) && 
                    a.AccountName.Equals(accountName)).Select(a => a.AccountId).ToList()[0];
                    return accountId;
                }
                return 0;
            }
        }
    }
}
