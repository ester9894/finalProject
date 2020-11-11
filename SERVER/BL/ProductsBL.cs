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
        public static void AddProduct(ProductsDTO p,long accountId=0)
        {
            using(ProjectDBEntities db = new ProjectDBEntities())
            {
                Product product = CONVERTERS.ProductsConverter.ConvertProductToDAL(p);
                if (accountId != 0)
                {
                    Account account = db.Accounts.FirstOrDefault(a => a.AccountId == accountId);
                    product.Accounts.Add(account);
                }
               db.Products.Add(product);
               db.SaveChanges();
            }
        }

        public static Dictionary<string,List<ProductsDTO>> GetAllProducts()
        {
            using (ProjectDBEntities db = new ProjectDBEntities())
            {

                return db.Products.ToList().Select(p=>CONVERTERS.ProductsConverter.ConvertProductToDTO(p)).GroupBy(p => p.CategoryName).ToDictionary(p => p.Key, p => p.ToList());
            }

        }

    }
}
