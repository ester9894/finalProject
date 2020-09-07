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
        public static void AddUser(UserDTO user)
        {
            using (ProjectDBEntities db = new ProjectDBEntities()) {
                db.Users.Add(CONVERTERS.UserConverter.ConvertUserToDAL(user));
                db.SaveChanges();
            }
        }
    }
}
