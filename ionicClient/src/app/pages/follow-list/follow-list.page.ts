import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { TIMEOUT } from 'dns';
import { Key } from 'protractor';
import { followUpList } from 'src/app/shared/models/follow_up_list.model';
import { FollowUpService } from 'src/app/shared/services/follow-up.service';
import {Location, PlatformLocation} from '@angular/common'
@Component({
  selector: 'app-follow-list',
  templateUrl: './follow-list.page.html',
  styleUrls: ['./follow-list.page.scss'],
})
export class FollowListPage implements OnInit {
accountId: Number
o = new Object() 
map= new Map()
showCheckbox = false
arrKind = new Array()// categories products
itemsForRemoveArray = []; // items for remove from followlist
forUdateFollowList: boolean = true
anyProductSellected:boolean=false;

  constructor(private location: Location, private followListService:FollowUpService, private router: Router, private alertController: AlertController) 
  {
  }

  ngOnInit() 
  {
    this.getFollowUpList()
    
  }

  getFollowUpList(){
    this.accountId =+localStorage.getItem('accountId') ;
    console.log(this.accountId)
    this.followListService.getListById(this.accountId).subscribe(res=>
    {
      console.log(res);
      Object.keys(res).forEach( key => { this.map.set(key, res[key]); } );
      Object.keys(res).forEach(element => { this.arrKind.push(element) });
      this.arrKind.sort()
    });
  }

  changeShowCheckbox()// change seen checkbox and every button that contact it
  {
    this.showCheckbox= !this.showCheckbox
    this.arrKind.forEach(element => 
    { 
      for(let item of this.map.get(element))
      {
        if(item.isChecked == true)
          item.isChecked = false
      }
    });
    this.itemsForRemoveArray=[]
  }

  removeFromList()
  {
    // get name Categories
    this.arrKind.forEach(element => 
    { // pop values (product) from map by category name
      for(let item of this.map.get(element))
      {
        if(item.isChecked == true)
          this.itemsForRemoveArray.push(item.ProductId) 
      }
    });
    console.log(this.itemsForRemoveArray)
    if(this.itemsForRemoveArray.length)
    {
      this.followListService.removeFromList(this.itemsForRemoveArray, this.accountId).subscribe(res=>
        {
          this.showAlert("לא נעקוב אחר מוצרים אלו")
        });
      this.changeShowCheckbox()
    }
    else
    {
      this.showAlert('בחר את מוצרים שברצונך שנפסיק לעקוב אחריהם')
    }  
  }

  closePage()
  {
    this.router.navigate(['home-page']);
  }

  async showAlert(mess: string)
  {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: mess,
      buttons: ['הבנתי']
    });
    await alert.present();
  }

  moveToProductsListPage()
  {
    this.router.navigate(['products',{isForFollowList: 'true'}]);
  }
}
