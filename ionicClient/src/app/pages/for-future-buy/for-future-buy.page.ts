import { Component, OnInit } from '@angular/core';
import { followUpList } from 'src/app/shared/models/follow_up_list.model';
import { FollowUpService } from 'src/app/shared/services/follow-up.service';

@Component({
  selector: 'app-for-future-buy',
  templateUrl: './for-future-buy.page.html',
  styleUrls: ['./for-future-buy.page.scss'],
})
export class ForFutureBuyPage implements OnInit {
  accountId = + localStorage.getItem('accountId')
  products: followUpList[] = []
  constructor(private followUpService: FollowUpService) {}

  ngOnInit() 
  {
    this.followUpService.getForFutureBuyAlerts(this.accountId).subscribe(res=> this.products=res)
  }

  CancelAlert(product: followUpList)
  {
    this.products.splice(this.products.findIndex(p=> p.ProductId == product.ProductId),1)
  }

}
