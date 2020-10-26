using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
   public class ListsBL
    {
        public static void AddList(ListDTO list)
        {
            using (ProjectDBEntities db = new ProjectDBEntities())
            {
                db.Lists.Add(CONVERTERS.ListConverter.ConvertListToDAL(list));
                db.SaveChanges();
            }
        }

    //    public static List<ListDTO> GetAllLists()
    //    {
    //        using (ProjectDBEntities db = new ProjectDBEntities())
    //        {

    //            return db.Lists.ToList().Select(l => CONVERTERS.ListConverter.ConvertListToDTO(l)).GroupBy(l => l.StartDate);

    //        }
    //    }
    //}
