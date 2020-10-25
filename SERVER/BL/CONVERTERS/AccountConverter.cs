using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.CONVERTERS
{
    public static class AccountConverter
    {
        public static Account ConvertAccountToDAL(AccountDTO a)
        {
            return new Account
            {
                AccountId = a.AccountId,
                AccountName = a.AccountName,
                ManagerId = a.ManagerId,
                Password = a.Password
            };
        }

        public static AccountDTO ConvertAccountToDTO(Account a)
        {
            return new AccountDTO
            {
              AccountId=a.AccountId,
                AccountName = a.AccountName,
              ManagerId=a.ManagerId,
              Password=a.Password
            };
        }
    }
}
