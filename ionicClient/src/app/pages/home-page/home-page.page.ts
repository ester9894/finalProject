import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alert } from 'src/app/shared/models/alert.model';
import { FollowUpService } from 'src/app/shared/services/follow-up.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
})
export class HomePagePage implements OnInit {
  accountId: number
  userId: number
  lastEnterDate: Date
  alerts: Alert[]
  constructor(private followUpService: FollowUpService, private route: ActivatedRoute, private router: Router) {
    this.route.paramMap.subscribe(params => {
      if (localStorage.getItem('status') == "true") { this.followUpService.creteAlerts(this.accountId).subscribe(res => console.log(res)) }
    })
  }

  ngOnInit() {

    this.userId = + localStorage.getItem('userId')
    this.accountId = + localStorage.getItem('accountId')
    this.lastEnterDate = new Date(parseInt(localStorage.getItem('lastDate')))
    localStorage.setItem('lastDate', JSON.stringify(Date.now()))
    // console.log(this.lastEnterDate)
    // console.log((new Date(Date.now()).valueOf() - new Date(this.lastEnterDate.valueOf()).valueOf()) / (1000 * 3600 * 24))
    //אם עבר יום מכניסתו האחרונה תעדכן לי את ההתראות
    console.log(new Date().setHours(0, 0, 0).valueOf())
    let d = new Date(this.lastEnterDate).valueOf();
console.log(d);

    if (this.accountId != 0 && (isNaN(d) || (new Date().setHours(0, 0, 0).valueOf() - new Date(this.lastEnterDate.setHours(0, 0, 0)).valueOf()).valueOf() / (1000 * 3600 * 24) >= 1)) {
      this.followUpService.creteAlerts(this.accountId).subscribe(res => console.log(res))
    }
    // מביא את רשימת ההתראות
    this.followUpService.getAlerts(this.accountId).subscribe(res => {
      console.log(res)
      this.alerts = res
    })

  }

  CancelAlert(alert: Alert) {
    this.followUpService.CancelAlertOfProduct(alert).subscribe(res => console.log(res))
  }

}
