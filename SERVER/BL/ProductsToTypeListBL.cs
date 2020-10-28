using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class ProductsToTypeListBL
    {
        public static List<ProductsToTypeListDTO> GetAllProductsByTypeId(long typeListId)
        {
            using (ProjectDBEntities db = new ProjectDBEntities())
            {
                List<ProductsToTypeListDTO> productsListDTO = new List<ProductsToTypeListDTO>();//אותו ממלאים ומחזירים - מוצרים של סוג רשימה כולל שמות
                List<ProductsToTypeList> products = db.ProductsToTypeLists.Where(p => p.TypeListId == typeListId).ToList();

                string productName;
                for (int i = 0; i < products.Count; i++)//עובר על הדטהבייס ומוציא את שם המוצר ע''פי הקוד שלו
                {
                    ProductsToTypeList productToTypeList = products[i];
                    productName = db.Products.Where(p => p.ProductId == productToTypeList.ProductId).Select(p => p.ProductName).ToList()[0];
                    productsListDTO.Add(new ProductsToTypeListDTO(){
                    ProductId= productToTypeList.ProductId,
                    TypeListId= productToTypeList.TypeListId,
                    Amount= productToTypeList.Amount,
                    ProductName= productName}
                    );
                }
                return productsListDTO;
            }

        }
    }
}
