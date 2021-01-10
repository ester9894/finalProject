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
        [Route("addList"), HttpPost]
        public IHttpActionResult AddList(ListDTO list)
        {
            return Ok(BL.ListsBL.AddList(list));
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
        public IHttpActionResult UpdateList(List<ProductsToTypeListDTO> productsList, long typeListId)
        {
            return Ok(BL.ProductsToTypeListBL.updateList(productsList, typeListId));
        }


        [Route("addNewProductsToList/{typeListId}")]
        [HttpGet, HttpPost]
        public IHttpActionResult AddNewProductsToList( int[] newProducts, long typeListId)
        {
            return Ok(BL.ProductsToTypeListBL.addNewProductsToList(newProducts, typeListId));
        }

        [Route("removeProduct/{TypeListId}/{ProductId}")]
        [HttpGet]
        public IHttpActionResult RemoveProduct(long TypeListId, long ProductId)
        {
            return Ok(BL.ProductsToTypeListBL.removeProduct(TypeListId, ProductId));
        }

        [Route("updateBuyList"), HttpPost]
        public IHttpActionResult UpdateBuyList(BuyListDTO buyList)
        {
            BL.ProductToListBL.AddProductsToList(buyList);
            return Ok(true);
        }

        [Route("GetAllActiveLists/{accountId}")]
        [HttpGet]
        public IHttpActionResult GetActiveLists(int accountId)
        {
            return Ok(BL.ListsBL.GetActiveLists(accountId));
        }

        [Route("GetProductsOfBuyList/{listId}")]
        [HttpGet]
        public IHttpActionResult GetProductsOfBuyList(long listId)
        {
            return Ok(BL.ListsBL.GetProductsOfBuyList(listId));
        }
    }
}
