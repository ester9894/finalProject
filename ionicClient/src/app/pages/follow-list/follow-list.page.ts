import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FollowUpService } from 'src/app/shared/services/follow-up.service';

@Component({
  selector: 'app-follow-list',
  templateUrl: './follow-list.page.html',
  styleUrls: ['./follow-list.page.scss'],
})
export class FollowListPage implements OnInit {
accountId: Number
  constructor(private followListService:FollowUpService, private router: Router,private active: ActivatedRoute) 
  { 
    this.active.paramMap.subscribe(params => { this.accountId = +params.get("AccountId") })
  }

  ngOnInit() 
  {
    this.followListService.getListById(this.accountId).subscribe(res=>{
      console.log(res);
        });
  }

}
