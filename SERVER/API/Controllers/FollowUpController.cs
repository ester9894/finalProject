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

        [Route("getListById/{id}")]// ניתוב לפונקציה המקבלת פרמטר
        [HttpGet]
        public IHttpActionResult GetListById(int id)
        {
          return Ok(BL.FollowUpBL.GetListById(id));
        }

        [Route("GetSortedFolowList/{id}")]// ניתוב לפונקציה  המקבלת פרמטר
        [HttpGet]
        public IHttpActionResult GetSortedFolowList(int id)
        {
            return Ok(BL.FollowUpBL.GetSortedFolowList(id));
        }

        [Route("removeFromList/{accountId}"), HttpPost]
        public IHttpActionResult removeFromList([FromUri] int accountId, [FromBody] int[] idSelectedProducts)
        {
            BL.FollowUpBL.removeProductsFromFollowUp(idSelectedProducts, accountId);
            return Ok(true);
        }

        //----ALERTS-----

        [Route("createAlerts")]// יצירת התראות
        [HttpPost]
        public IHttpActionResult CreateAlerts([FromBody] int accountId)
        {
            BL.FollowUpBL.CreateAlertsForAccount(accountId);
            return Ok(true);
        }

        [Route("getAlertsForAccount/{accountId}")]// קבלת התראות של החשבון
        [HttpGet]
        public IHttpActionResult GetAlertsForAccount(int accountId)
        {
            return Ok(BL.FollowUpBL.GetAlertsForAccount(accountId));
        }

        [Route("CancelAlertOfProduct")]// ביטול התראה
        [HttpPost]
        public IHttpActionResult CancelAlertOfProduct([FromBody] AlertDTO alert)
        {
            BL.FollowUpBL.CancelAlertOfProduct(alert);
            return Ok(true);
        }


        [Route("GetForFutureBuyAlerts/{accountId}")]// קבלת התראות של החשבון
        [HttpGet]
        public IHttpActionResult GetForFutureBuyAlerts(int accountId)
        {
            return Ok(BL.FollowUpBL.AlertsForFutureAccount(accountId));
        }
    }
}
