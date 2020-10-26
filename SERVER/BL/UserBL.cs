using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class UserBL
    {
        public static long AddUser(UserDTO user)
        {
            long userId;
            using (ProjectDBEntities db = new ProjectDBEntities()) {
                db.Users.Add(CONVERTERS.UserConverter.ConvertUserToDAL(user));

                db.SaveChanges();
                

                userId= db.Users.Where(a => a.UserName.Equals(user.UserName) &&
                    a.LastName.Equals(user.LastName) && 
                    a.FirstName.Equals(user.FirstName) &&
                    a.Email.Equals(user.Email)).Select(a => a.UserId).ToList()[0];
                return userId;
            }
        }
    }
}
