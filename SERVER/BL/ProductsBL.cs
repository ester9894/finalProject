using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class ProductsBL
    {
        public static void AddProduct(ProductsDTO p)
        {
            using(ProjectDBEntities db = new ProjectDBEntities())
            {
               db.Products.Add(CONVERTERS.ProductsConverter.ConvertProductToDAL(p));
               db.SaveChanges();
            }
        }

        public static List<ProductsDTO> GetAllProducts()
        {
            using (ProjectDBEntities db = new ProjectDBEntities())
            {
                return db.Products.ToList().Select(p => CONVERTERS.ProductsConverter.ConvertProductToDTO(p)).ToList();
            }
            }
       }
}
