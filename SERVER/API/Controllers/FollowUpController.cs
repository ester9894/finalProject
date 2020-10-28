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
        [Route("saveList"), HttpPost]
        public IHttpActionResult SaveList(int[] idSelectedProducts, int idAccount)
        {
            BL.FollowUpBL.AddFollowUp(idSelectedProducts, idAccount) ;
            return Ok(true);
        }

        [Route("getListById/{id}")]// ניתוב לפונקציה  המקבלת פרמטר
        [HttpGet]
        public IHttpActionResult GetListById(int id)
        {
          return Ok(BL.FollowUpBL.GetListById(id));
        }
    }
}
