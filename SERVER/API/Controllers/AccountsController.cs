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
    [RoutePrefix("api/accounts")]
    public class AccountsController : ApiController
    {
        [Route("AddAccount"), HttpPost]
        public IHttpActionResult AddAccount(AccountDTO a)
        {
            BL.AccountsBL.AddAccount(a);
            return Ok(true);
        }

        //[Route("checkPass/{pass}/{accountName}"), HttpGet]
        //public IHttpActionResult CheckPass(string pass, string accountName)
        //{
        //    BL.AccountsBL.CheckPass(pass, accountName);
        //    return Ok(true);
        //}
    }
}
