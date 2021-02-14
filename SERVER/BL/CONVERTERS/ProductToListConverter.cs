using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.CONVERTERS
{
   public static class ProductToListConverter
    {
        public static ProductToList ConvertProductToListToDAL(ProductToListDTO p)
        {
            return new ProductToList
            {
                ProductToListId_= p.ProductToListId,
                ProductId = p.ProductId,
                ListId = p.ListId,
                BuyerId = p.BuyerId,
                DateOfBuy = p.DateOfBuy,
                Amount = p.Amount

            };
        }

        public static ProductToListDTO ConvertProductToListToDTO(ProductToList p)
        {
            return new ProductToListDTO
            {
                ProductToListId = p.ProductToListId_,
                ProductId = p.ProductId,
                ListId = p.ListId,
                BuyerId = p.BuyerId,
                DateOfBuy = p.DateOfBuy,
                Amount = p.Amount,
                ProductName = p.Product.ProductName,
                CategotyName = p.Product.Category.CategoryName ,
                ListName = p.List.TypesList.TypeListName
              
            };
        }

        public static List<ProductToListDTO> ConvertProductToListToDTO(List<ProductToList> p)
        {
            return p.Select(pr => ConvertProductToListToDTO(pr)).ToList();
        }
    }
}
