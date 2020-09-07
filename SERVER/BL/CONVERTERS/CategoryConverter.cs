using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.CONVERTERS
{
   public static class CategoryConverter
    {
        public static Category ConvertCategoryToDAL(CategoryDTO c)
        {
            return new Category
            {
                CategoryId = c.CategoryId,
                CategoryName = c.CategoryName
            };
        }

        public static CategoryDTO ConvertCategoryToDTO(Category c)
        {
            return new CategoryDTO
            {
               CategoryId=c.CategoryId,
               CategoryName=c.CategoryName
            };
        }
    }
}
