using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.CONVERTERS
{
   public static class UserAccountConverter
    {
        public static UsersAccount ConvertUsersAccountToDAL(UsersAccountDTO u)
        {
            return new UsersAccount
            {
                UserId = u.UserId,
                AccountId = u.AccountId,
                UserAccountId = u.UserAccountId
            };
        }

        public static UsersAccountDTO ConvertUsersAccountToDTO(UsersAccount u)
        {
            return new UsersAccountDTO
            {
             UserId=u.UserId,
             AccountId=u.AccountId,
             UserAccountId=u.UserAccountId
            };
        }
    }
}
