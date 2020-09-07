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
    [RoutePrefix("api/users")]
    public class UsersController : ApiController
    {
        [Route("addUser"), HttpPost]
        public IHttpActionResult AddUser(UserDTO user)
        {
            BL.UserBL.AddUser(user);
            return Ok(true);
             
        }
    }
}
