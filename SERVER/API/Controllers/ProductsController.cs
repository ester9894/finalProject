using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace API.Controllers
{
    [EnableCors("*", "*", "*")]
    [RoutePrefix("api/products")]// הניתוב לעמוד הזה, מכיוון שיש כמה פונקציות get צריך לדעת לאיזה מהם לגשת
    public class ProductsController : ApiController
    {
        [Route("GetNumProducts")]// ניתוב לפונקציה הזאת
        [HttpGet]
        public IHttpActionResult GetNumProducts()
        {
            return Ok();
        }

        [Route("GetAllProducts/{accountId}")]// ניתוב לפונקציה הזאת
        [HttpGet]
        public IHttpActionResult GetAllProducts(int accountId)
        {
            return Ok(BL.ProductsBL.GetAllProducts(accountId));
        }

        [Route("GetProducts/{p}")]// ניתוב לפונקציה  המקבלת פרמטר
        [HttpGet]
        public int GetProducts(int p)
        {
            return p;
        }
        [Route("AddProduct"), HttpPost]
        public IHttpActionResult AddProduct(ProductsDTO p)
        {
            BL.ProductsBL.AddProduct(p);
            return Ok(true);
        }

        [Route("AddProductForAccount/{accountId}"), HttpPost]
        public List<long> AddProduct([FromUri] int accountId, [FromBody] List<ProductsDTO> p)
        {
           return(BL.ProductsBL.AddPersonalProducts(p, accountId));
        }

        [Route("GetProductsByIdProduct")]// ניתוב לפונקציה  המקבלת פרמטר
        [HttpPost]
        public IHttpActionResult GetProductsByIdProduct(int[] idProducts)
        {
            return Ok(BL.ProductsBL.GetProductsByIdProduct(idProducts));
        }
    }
}
