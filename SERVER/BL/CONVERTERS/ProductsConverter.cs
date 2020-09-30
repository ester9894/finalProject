using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.CONVERTERS
{
    public static class ProductsConverter
    {
        public static Product ConvertProductToDAL(ProductsDTO p)
        {
            return new Product
            {
                CategoryId = p.CategoryId,
                ProductId = p.ProductId,
                ProductName = p.ProductName
            };
        }

        public static ProductsDTO ConvertProductToDTO(Product p)
        {
            return new ProductsDTO
            {
                CategoryId = p.CategoryId,
                ProductId = p.ProductId,
                ProductName = p.ProductName,
                CategoryName=p.Category.CategoryName
            };
        }
    }
}
