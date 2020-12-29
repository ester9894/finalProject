﻿using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class ListsBL
    {
        public static long AddList(ListDTO list)
        {
            using (ProjectDBEntities db = new ProjectDBEntities())
            {
                list.StartDate = DateTime.Now;
                List newList = CONVERTERS.ListConverter.ConvertListToDAL(list);
                db.Lists.Add(newList);
                List<ProductToList> products = db.ProductsToTypeLists.Where(p => p.TypeListId == list.TypeListId).ToList().
                      Select(pl => new ProductToList { ProductId = pl.ProductId }).ToList();
                products.ForEach(p => newList.ProductToLists.Add(p));    
                db.SaveChanges();
                return Convert.ToInt64(db.Lists.OrderByDescending(product => product.StartDate).Take(1).Select(p=>p.ListId));
            }
        }

        /// <summary>
        /// פונקציה המחזירה את רשימת המוצרים שעוד לא נקנו לקניה מסויימת
        /// </summary>
        /// <param name="listId"></param>
        public static List<ProductToListDTO> ProductsOfBuyList(long listId)
        {
            using (ProjectDBEntities db = new ProjectDBEntities())
            {
                var prods = db.ProductToLists.Where(p => p.ListId == listId && p.DateOfBuy == null).ToList();
                prods.ForEach( p=>p.Amount=p.List.TypesList.ProductsToTypeLists.FirstOrDefault(pr=>pr.ProductId==p.ProductId).Amount);
                return CONVERTERS.ProductToListConverter.ConvertProductToListToDTO(prods);
            }
        }

        public static List<ListDTO> GetActiveLists(int accountId)
        {
            using (ProjectDBEntities db = new ProjectDBEntities())
            {
              return CONVERTERS.ListConverter.ConvertArrayListToDTO(db.Lists.Where(list => list.TypesList.AccountId == accountId && list.EndDate != null && list.EndDate < DateTime.Now).ToList());
            }
        }
    }
  }
