using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace API.Controllers
{  //סתם בדיקה נוספתנ
    [EnableCors("*", "*", "*")]
    [RoutePrefix("api/login")]
    public class LoginController : ApiController
    {
        [Route("checkLogin"), HttpPost,HttpGet]
        public IHttpActionResult checkLogin(LoginDTO login)
        {
            if(BL.AccountsBL.checkLogin(login)!=null)
             return Ok(BL.AccountsBL.checkLogin(login));
            return BadRequest();
        }
    }
}
