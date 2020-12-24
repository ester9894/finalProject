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
    [RoutePrefix("api/lists")]
    public class ListsController : ApiController
    {
        [Route("AddList"), HttpPost]
        public IHttpActionResult AddList(ListDTO list)
        {
            BL.ListsBL.AddList(list);
            return Ok(true);
        }

        [Route("addProductsToList/{accountId}"), HttpPost]
        public IHttpActionResult AddProductsToList([FromUri] int accountId, [FromBody] ListForChangeDTO listForAdd)
        {
            return Ok(BL.TypeListBL.SaveList(accountId, listForAdd));
        }

        [Route("GetAllTypesList/{accountId}")]
        [HttpGet]
        public IHttpActionResult GetAllTypesList(long accountId)
        {
            return Ok(BL.TypeListBL.GetAllTypesList(accountId));
        }

        [Route("GetAllProductsByTypeId/{typeListId}")]
        [HttpGet]
        public IHttpActionResult GetAllProductsByTypeId(long typeListId)
        {
            return Ok(BL.ProductsToTypeListBL.GetAllProductsByTypeId(typeListId));
        }

        [Route("updateList/{typeListId}")]
        [HttpGet, HttpPost]
        public IHttpActionResult updateList(List<ProductsToTypeListDTO> productsList, long typeListId)
        {
            return Ok(BL.ProductsToTypeListBL.updateList(productsList, typeListId));
        }


        [Route("addNewProductsToList/{typeListId}")]
        [HttpGet, HttpPost]
        public IHttpActionResult addNewProductsToList( int[] newProducts, long typeListId)
        {
            return Ok(BL.ProductsToTypeListBL.addNewProductsToList(newProducts, typeListId));
        }

        [Route("removeProduct/{TypeListId}/{ProductId}")]
        [HttpGet]
        public IHttpActionResult removeProduct(long TypeListId, long ProductId)
        {
            return Ok(BL.ProductsToTypeListBL.removeProduct(TypeListId, ProductId));
        }

        [Route("updateBuyList"), HttpPost]
        public IHttpActionResult updateBuyList(int userId, int typeListId, List<ProductToListDTO> products)
        {
            BL.ProductToListBL.AddProductsToList(userId, typeListId, products);
            return Ok(true);
        }

    }
}
