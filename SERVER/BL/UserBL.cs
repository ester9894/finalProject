﻿using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class UserBL
    {/// <summary>
    /// מוסיפה משתמש חדש לטבלה
    /// </summary>
    /// <param name="user"></param>
    /// <returns></returns>
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

        public static UserDTO GetUser(long userId)
        {
            using (ProjectDBEntities db = new ProjectDBEntities())
            {
                return CONVERTERS.UserConverter.ConvertUserToDTO( db.Users.Where(u => u.UserId == userId).ToList()[0]);
            }            
        }
    }
}
