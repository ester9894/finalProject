using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.CONVERTERS
{
  public static  class TypeListConverter
    {
        public static TypesList ConvertTypeListToDAL(TypeListDTO t)
        {
            return new TypesList
            {
                TypeListId = t.TypeListId,
                AccountId = t.AccountId,
                TypeListName = t.TypeListName
            };
        }

        public static TypeListDTO ConvertTypeListToDTO(TypesList t)
        {
            return new TypeListDTO
            {
             TypeListId=t.TypeListId,
             AccountId=t.AccountId,
             TypeListName=t.TypeListName
            };
        }
    }
}
