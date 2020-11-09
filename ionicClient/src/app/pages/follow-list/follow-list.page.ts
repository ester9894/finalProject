import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
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
showCheckbox = false
arrKind = new Array()// categories products
itemsForRemoveArray = []; // items for remove from followlist
forUdateFollowList: boolean = true
anyProductSellected:boolean=false;
  constructor(private followListService:FollowUpService, private router: Router, private alertController: AlertController) 
  { 
  }

  ngOnInit() 
  {
    this.accountId =+localStorage.getItem('accountId') ;
    console.log(this.accountId)

    this.followListService.getListById(this.accountId).subscribe(res=>
      {
      //console.log(res);
      Object.keys(res).forEach( key => { this.map.set(key, res[key]); } );
        Object.keys(res).forEach(element => {
          this.arrKind.push(element)
        });
       console.log(this.map.keys()) 
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
    if(!this.itemsForRemoveArray.values)
    {
      this.followListService.removeFromList(this.itemsForRemoveArray, this.accountId)
      this.changeShowCheckbox()
    }
    else
    this.showAlert()
     
  }

  closePage()
  {
    this.router.navigate(['home-page']);
  }

  async showAlert()
  {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'אנא בחר מוצרים להסרה',
      buttons: ['הבנתי']
    });
    await alert.present();
  }

  moveToProductsListPage()
  {
    this.router.navigate(['products/true']);
  }
}
