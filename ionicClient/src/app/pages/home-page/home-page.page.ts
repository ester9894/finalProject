import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
})
export class HomePagePage implements OnInit {
  accountId:number
  constructor() { }

  ngOnInit() {
  }

 // this.router.navigate(['types-list',{"accountId":this.accountId}]);
  
}
