using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.CONVERTERS
{
   public static class ProductsToTypeListConverter
    {
        public static ProductsToTypeList ConvertProductsToTypeListToDAL(ProductsToTypeListDTO p)
        {
            return new ProductsToTypeList
            {
                TypeListId = p.TypeListId,
                Amount = p.Amount,
                ProductId = p.ProductId
            };
        }

        public static ProductsToTypeListDTO ConvertProductsToTypeListToDTO(ProductsToTypeList p)
        {
            return new ProductsToTypeListDTO
            {
                TypeListId=p.TypeListId,
                Amount=p.Amount,
                ProductId=p.ProductId
            };
        }
    }
}
