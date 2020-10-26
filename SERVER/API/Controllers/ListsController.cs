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
        public IHttpActionResult AddList(ListDTO l)
        {
            BL.ListsBL.AddList(l);
            return Ok(true);
        }

        [Route("GetAllLists")]
        [HttpGet]
        //public IHttpActionResult GetAllLists()
        //{
        //    return Ok(BL.ListsBL.GetAllLists());
        //}
    }
}
