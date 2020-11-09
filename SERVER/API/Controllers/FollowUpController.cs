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
    [RoutePrefix("api/followUp")]
    public class FollowUpController : ApiController
    {
        [Route("saveList/{accountId}"), HttpPost]
        public IHttpActionResult SaveList([FromUri] int accountId, [FromBody] int[] idSelectedProducts)
        {
            BL.FollowUpBL.AddFollowUp(idSelectedProducts, accountId) ;
             return Ok(true);
        }

        [Route("getListById/{id}")]// ניתוב לפונקציה  המקבלת פרמטר
        [HttpGet]
        public IHttpActionResult GetListById(int id)
        {
          return Ok(BL.FollowUpBL.GetListById(id));
        }

        [Route("removeFromList/{accountId}"), HttpPost]
        public IHttpActionResult removeFromList([FromUri] int accountId, [FromBody] int[] idSelectedProducts)
        {
            BL.FollowUpBL.removeProductsFromFollowUp(idSelectedProducts, accountId);
            return Ok(true);
        }
    }
}
