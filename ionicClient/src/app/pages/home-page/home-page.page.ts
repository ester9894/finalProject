import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  constructor(private followUpService: FollowUpService, private route: ActivatedRoute) { 
    this.route.paramMap.subscribe(params => {
      if(localStorage.getItem('status') == "true")
      { this.followUpService.creteAlerts(this.accountId).subscribe(res=> console.log(res)) }
    })
  }

  ngOnInit() 
  {
    this.userId = + localStorage.getItem('userId')
    this.accountId = + localStorage.getItem('accountId')
    this.lastEnterDate = new Date(parseInt(localStorage.getItem('lastDate')) )
    localStorage.setItem('lastDate', JSON.stringify(Date.now()))
    // console.log(this.lastEnterDate)
    // console.log((new Date(Date.now()).valueOf() - new Date(this.lastEnterDate.valueOf()).valueOf()) / (1000 * 3600 * 24))
    //אם עבר יום מכניסתו האחרונה תעדכן לי את ההתראות
    if(new Date(Date.now()).valueOf() - new Date(this.lastEnterDate.valueOf()).valueOf() / (1000 * 3600 * 24) > 1)
      { this.followUpService.creteAlerts(this.accountId).subscribe(res=> console.log(res)) }
      // מביא את רשימת ההתראות
    this.followUpService.getAlerts(this.accountId).subscribe(res=> console.log(res))
  }
}
