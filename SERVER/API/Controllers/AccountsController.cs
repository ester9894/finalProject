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
        public long AddAccount(AccountDTO newAccount)
        {
         return BL.AccountsBL.AddAccount(newAccount);
        }

        [Route("checkPass/{pass}/{accountName}"), HttpGet]
        public long CheckPass(string pass, string accountName)
        {
            return BL.AccountsBL.CheckPass(pass, accountName);
        }


        [Route("addUserAccount/{userId}/{accountId}"), HttpGet]
        public void addUserAccount(int userId, int accountId)
        {
           BL.AccountsBL.addUserAccount(userId, accountId);
        }

        [Route("GetAccount/{accountId}"), HttpGet]
        public AccountDTO GetAccount(long accountId)
        {
            return BL.AccountsBL.GetAccount(accountId);
        }

        [Route("GetAllAccountsByUser/{userId}"), HttpGet]
        public List<AccountDTO> GetAllAccountsByUser(long userId)
        {
            return BL.AccountsBL.GetAllAccountsByUser(userId);
        }

    }

   
}
