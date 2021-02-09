using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.CONVERTERS
{
   public static class AlertConverter
    {
        public static Alert ConvertAlertToDAL(AlertDTO a)
        {
            return new Alert
            {
                AlertId = a.AlertId,
                Date = a.Date,
                Days = a.days,
                FollowUpListId = a.FollowUpListId,
                IsActivated = a.IsActivated,
                ProductId = a.ProductId
            };
        }

        public static AlertDTO ConvertAlertToDTO(Alert a)
        {
            return new AlertDTO
            {
                AlertId = a.AlertId,
                Date = a.Date,
                days = a.Days,
                FollowUpListId = a.FollowUpListId,
                IsActivated = a.IsActivated,
                ProductId = a.ProductId,
                ProductName = a.Product.ProductName
            };
        }
    }
}
