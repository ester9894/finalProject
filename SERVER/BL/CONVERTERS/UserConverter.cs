using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.CONVERTERS
{
   public static class UserConverter
    {
        public static User ConvertUserToDAL(UserDTO u)
        {
            return new User
            {
                Email = u.Email,
                FirstName = u.FirstName,
                LastName = u.LastName,
                UserId = u.UserId,
                UserName = u.UserName
            };
        }

        public static UserDTO ConvertUserToDTO(User u)
        {
            return new UserDTO
            {
                Email=u.Email,
                FirstName=u.FirstName,
                LastName=u.LastName,
                UserId=u.UserId,
                UserName=u.UserName
            };
        }
    }
}
