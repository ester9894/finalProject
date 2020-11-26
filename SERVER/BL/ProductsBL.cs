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
        public static long AddProduct(ProductsDTO p,long accountId=0)
        {
            using(ProjectDBEntities db = new ProjectDBEntities())
            {
                if(db.Products.FirstOrDefault(pro => pro.ProductName == p.ProductName)== null)//אם לא קיים מוצר בשם זה אז תוסיף אותו לרשימה של חשבון מסוים
                {
                    Product product = CONVERTERS.ProductsConverter.ConvertProductToDAL(p);
                    if (accountId != 0)
                    {
                        Account account = db.Accounts.FirstOrDefault(a => a.AccountId == accountId);
                        product.Accounts.Add(account);
                    }
                    db.Products.Add(product);
                    db.SaveChanges();
                    return product.ProductId;
                }

            }
            return 0;
        }

        public static List<long> AddPersonalProducts(List<ProductsDTO> p, long accountId)
        {
            List<long> idNewProducts = new List<long>();
            p.ForEach(pr => idNewProducts.Add(AddProduct(pr, accountId))); 
            return idNewProducts;
        }

        public static Dictionary<string,List<ProductsDTO>> GetAllProducts(int accountId)
        {
            List<Product> generalList = new List<Product>();
            List<Product> personalList = new List<Product>();
            List<Product> unionList = new List<Product>();
            
            using (ProjectDBEntities db = new ProjectDBEntities())
            {
               generalList = db.Products.Where(p => p.Accounts.FirstOrDefault(productAccount => productAccount.AccountId == accountId) != null).ToList();//עובר על כל מוצר מהמוצרים שנוספו ע"י משתמשים ובודק אם הוא שייך לחשבון זה
               personalList = db.Products.Where(p => p.Accounts.Count == 0).ToList();// כל המוצרים הכללים שלא שייכים לשום חשבון
               personalList.AddRange(generalList);
               return personalList.Select(p=>CONVERTERS.ProductsConverter.ConvertProductToDTO(p)).GroupBy(p => p.CategoryName).ToDictionary(p => p.Key, p => p.ToList());
               // return db.Products.Where(p=>p.Accounts.Count==0 ).ToList().Select(p=>CONVERTERS.ProductsConverter.ConvertProductToDTO(p)).GroupBy(p => p.CategoryName).ToDictionary(p => p.Key, p => p.ToList());
            }

        }

        public static Dictionary<string, List<ProductsDTO>> GetProductsByIdProduct(int[] idProducts)
        {
            using (ProjectDBEntities db = new ProjectDBEntities())
            {
                List<ProductsDTO> list = new List<ProductsDTO>();
                //ProductsDTO product = new ProductsDTO();
                // Product product1 = new Product();
                //foreach (var product in db.Products)
                //{
                //    if (idProducts.Where(idProduct => idProduct == product.ProductId) != null)
                //    {
                //        list.Add(CONVERTERS.ProductsConverter.ConvertProductToDTO(product));
                //    }
                //}

                foreach (var id in idProducts)
                {
                  List<Product> p1 = db.Products.Where(p => p.ProductId == id).ToList();
                    if(p1.FirstOrDefault() != null)
                        list.Add(CONVERTERS.ProductsConverter.ConvertProductToDTO(p1.FirstOrDefault()));
                }

                //product1 = db.Products.SingleOrDefault(idFromTable => idFromTable.ProductId == idProduct);
                // product =CONVERTERS.ProductsConverter.ConvertProductToDTO(product1) ;
                // list.Add(product);
                return list.GroupBy(p => p.CategoryName).ToDictionary(p => p.Key, p => p.ToList());
               
            }
        }
    }
}
