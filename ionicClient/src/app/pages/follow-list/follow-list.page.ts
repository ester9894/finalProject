import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Key } from 'protractor';
import { followUpList } from 'src/app/shared/models/follow_up_list.model';
import { FollowUpService } from 'src/app/shared/services/follow-up.service';

@Component({
  selector: 'app-follow-list',
  templateUrl: './follow-list.page.html',
  styleUrls: ['./follow-list.page.scss'],
})
export class FollowListPage implements OnInit {
accountId: Number
o = new Object() 
map= new Map()
arrKind = new Array()// categories products
  arrProducts = new Array() // all products
  constructor(private followListService:FollowUpService, private router: Router) 
  { 

  }

  ngOnInit() 
  {
    console.log(localStorage.setItem('1','1'))
    this.accountId =Number(localStorage.getItem('1')) ;
    console.log(this.accountId)

    this.followListService.getListById(this.accountId).subscribe(res=>
      {
      //console.log(res);
      Object.keys(res).forEach( key => { this.map.set(key, res[key]); } );
        Object.keys(res).forEach(element => {
          this.arrKind.push(element)
        });
        console.log(this.map.get('ירקות'));
       console.log(this.map.keys()) 
      });
  }

}
