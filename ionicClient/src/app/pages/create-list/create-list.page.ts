import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { type } from 'os';
import { mapTo } from 'rxjs/operators';
import { ListForChange } from 'src/app/shared/models/list_for_change';
import { ListsService } from 'src/app/shared/services/lists.service';
import { ProductsService } from 'src/app/shared/services/products.service';
import {Location} from '@angular/common'

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.page.html',
  styleUrls: ['./create-list.page.scss'],
})
export class CreateListPage implements OnInit 
{
  productsList:Number[]
  map= new Map()
  nameList: string
  idAccount: Number;
  list= new ListForChange()
  constructor(private _location: Location, private router: Router, private route:ActivatedRoute,private listService:ListsService, private productService:ProductsService, private alertController: AlertController) 
  {
    this.route.params.subscribe(params => 
      {
        console.log(Array.of(params['productsList'])) 
       this.productsList=(params['productsList'].split(',')).map(x=>+x);
        if(this.productsList != undefined)
           this.getProductsById()
      });
 }

  ngOnInit() 
  {
    this.idAccount =+ localStorage.getItem('accountId')
    console.log(this.idAccount )      
  }

  goProductsList()
  {
    this.router.navigateByUrl('products')
  }

  saveList()
  {
    this.presentAlertPromptCategory()
  }

  async presentAlertPromptCategory() 
  {
     var alert = await this.alertController.create(
     {
     cssClass: 'my-custom-class',
     header: 'הכנס שם רשימה',
     inputs: [{type:'text',  name:'nameList'}],
     buttons: 
     [
       {
         text: 'ביטול',
         role: 'cancel',
         cssClass: 'secondary',
         handler: () => {console.log('Confirm Cancel');}
       }, 
       {
         text: 'שמור',
         handler: (alertData) => 
         {
           console.log(alertData.nameList)
          this.list.nameList = alertData.nameList
          this.list.idProductsList = this.productsList
          this.listService.addProductsToList(this.idAccount,this.list).subscribe((res) => { this.router.navigateByUrl('show-list') });
         }
       }
     ]
   });
   console.log(alert.inputs.length)
   await alert.present();
 }


  getProductsById()
  {
        this.productService.getProductsByIdProduct(this.productsList).subscribe((res) => 
        {
          Object.keys(res).forEach( key => { this.map.set(key, res[key]); } );
        });
  }
}
