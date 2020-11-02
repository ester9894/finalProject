using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.CONVERTERS
{
  public static  class FollowUpListConverter
    {
        public static FollowUpList ConvertFollowUpListToDAL(FollowUpListDTO f)
        {
            return new FollowUpList
            {
                Amount = f.Amount,
                FollowUpListId = f.FollowUpListId,
                FrequencyId = f.FrequencyId,
                ProductId = f.ProductId,
                AccountId = f.AccountId
            };
        }

        public static FollowUpListDTO ConvertFollowUpListToDTO(FollowUpList f)
        {
            return new FollowUpListDTO
            {
                Amount=f.Amount,
                FollowUpListId=f.FollowUpListId,
                FrequencyId=f.FrequencyId,
                ProductId=f.ProductId,
                AccountId = f.AccountId,
                ProductName = f.Product.ProductName
            };
        }

    }
}
