using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.CONVERTERS
{
    public static class ListConverter
    {
        public static List ConvertListToDAL(ListDTO l)
        {
            return new List
            {
                EndDate = l.EndDate,
                StartDate = l.StartDate,
                ListId = l.ListId,
                TypeListId = l.TypeListId
            };
        }

        public static ListDTO ConvertListToDTO(List l)
        {
            return new ListDTO
            {
                EndDate = l.EndDate,
                StartDate = l.StartDate,
                ListId = l.ListId,
                TypeListId = l.TypeListId,
                TypeListName = l.TypeListName
            };
        }

        public static List<ListDTO> ConvertArrayListToDTO(List<List> lists)
        {
            return lists.Select(list => ConvertListToDTO(list)).ToList();
        }
    }
}
