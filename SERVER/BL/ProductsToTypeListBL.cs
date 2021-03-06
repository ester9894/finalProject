﻿using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class ProductsToTypeListBL
    {
        public static List<ProductsToTypeListDTO> GetAllProductsByTypeId(long typeListId)
        {
            using (ProjectDBEntities db = new ProjectDBEntities())
            {
                List<ProductsToTypeListDTO> productsListDTO = new List<ProductsToTypeListDTO>();//אותו ממלאים ומחזירים - מוצרים של סוג רשימה כולל שמות
                List<ProductsToTypeList> products = db.ProductsToTypeLists.Where(p => p.TypeListId == typeListId).ToList();

                string productName;
                for (int i = 0; i < products.Count; i++)//עובר על הדטהבייס ומוציא את שם המוצר ע''פי הקוד שלו
                {
                    ProductsToTypeList productToTypeList = products[i];
                    productName = db.Products.Where(p => p.ProductId == productToTypeList.ProductId).Select(p => p.ProductName).ToList()[0];
                    productsListDTO.Add(new ProductsToTypeListDTO(){
                    ProductId= productToTypeList.ProductId,
                    TypeListId= productToTypeList.TypeListId,
                    Amount= productToTypeList.Amount,
                    ProductName= productName}
                    );
                }
                return productsListDTO;
            }

        }

        public static bool addNewProductsToList(int[] newProducts, long typeListId)
        {
            using (ProjectDBEntities db = new ProjectDBEntities())
            {
               
                for (int i = 0; i < newProducts.Length; i++)
                {
                    long productId = newProducts[i];
                    if (!db.ProductsToTypeLists.Any(p => p.ProductId == productId&& p.TypeListId==typeListId))
                    {
                        db.ProductsToTypeLists.Add(new ProductsToTypeList()
                        {
                            Amount = 1,
                            ProductId = newProducts[i],
                            TypeListId = typeListId
                        });
                        db.SaveChanges();
                    }
                }

            }

                return true;
        }

        

        public static bool updateList(List<ProductsToTypeListDTO> productsListToUpdate, long typeListId)
        {
            using (ProjectDBEntities db = new ProjectDBEntities())
            {
                List<ProductsToTypeList> products = db.ProductsToTypeLists.Where(p => p.TypeListId == typeListId).ToList();
                //בדיקה האם יש מוצר שנמחק- ומחיקתו מהדטהבייס
                for (int i = 0; i < products.Count; i++)//הרשימה בדטהבייס
                {
                    int j;
                    for (j = 0; j < productsListToUpdate.Count && products[i].ProductId != productsListToUpdate[j].ProductId; j++) ;//הרשימה החדשה
                    if (j == productsListToUpdate.Count)//אם לא מצא את המוצר ברשימה החדשה (המוצר נמחק
                    {
                        long productId = products[i].ProductId;
                        ProductsToTypeList product = db.ProductsToTypeLists.Where(p => p.ProductId == productId).ToList()[0];
                        db.ProductsToTypeLists.Remove(product);
                        db.SaveChanges();
                    }
                }
                //עדכון שינויים
                for (int i = 0; i < productsListToUpdate.Count; i++)//הרשימה החדשה
                {
                    for (int j = 0; j < products.Count; j++)//הרשימה בדטהבייס
                    {
                       if(productsListToUpdate[i].ProductId==products[j].ProductId)
                        {
                            if(products[j].Amount != productsListToUpdate[i].Amount)
                            products[j].Amount = productsListToUpdate[i].Amount;
                            db.SaveChanges();

                            break;
                        }

                    }

                }
            }

            return true;
        }

        public static bool removeProduct(long typeListId, long productId)
        {
            using (ProjectDBEntities db = new ProjectDBEntities())
            {
                ProductsToTypeList product = db.ProductsToTypeLists.Where(p =>p.TypeListId== typeListId  && p.ProductId == productId ).ToList()[0];
                db.ProductsToTypeLists.Remove(product);
                db.SaveChanges();
            }

            return true;
        }
    }
}
