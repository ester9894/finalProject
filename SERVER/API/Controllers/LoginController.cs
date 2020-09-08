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
    [RoutePrefix("api/login")]
    public class LoginController : ApiController
    {
        [Route(""), HttpPost]
        public IHttpActionResult checkLogin(LoginDTO login)
        {
            if (BL.AccountsBL.checkLogin(login) == true)
                return Ok(true);
            else
                return Ok(false);
        }
    }
}
