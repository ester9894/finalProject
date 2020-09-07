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
        [Route("AddFollowUp"), HttpPost]
        public IHttpActionResult AddFollowUp(FollowUpListDTO f)
        {
            BL.FollowUpBL.AddFollowUp(f);
            return Ok(true);
        }
    }
}
