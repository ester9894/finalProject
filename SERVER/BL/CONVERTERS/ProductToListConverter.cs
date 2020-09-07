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
                ProductToListId_ = p.ProductToListId_,
                ProductId = p.ProductId,
                ListId = p.ListId,
                BuyerId = p.BuyerId,
                DateOfBuy = p.DateOfBuy
            };
        }

        public static ProductToListDTO ConvertProductToListToDTO(ProductToList p)
        {
            return new ProductToListDTO
            {
              ProductToListId_=p.ProductToListId_,
              ProductId=p.ProductId,
              ListId=p.ListId,
              BuyerId=p.BuyerId,
              DateOfBuy=p.DateOfBuy
            };
        }
    }
}
