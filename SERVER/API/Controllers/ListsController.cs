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

        [Route("GetAllTypesList/{accountId}")]
        [HttpGet]
        public IHttpActionResult GetAllTypesList(long accountId)
        {
            return Ok(BL.TypeListBL.GetAllTypesList(accountId));
        }
    }
}
