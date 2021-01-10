import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { type } from 'os';
import { mapTo } from 'rxjs/operators';
import { ListForChange } from 'src/app/shared/models/list_for_change';
import { ListsService } from 'src/app/shared/services/lists.service';
import { ProductsService } from 'src/app/shared/services/products.service';
import {Location} from '@angular/common'
import { Products } from 'src/app/shared/models/products.model';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.page.html',
  styleUrls: ['./create-list.page.scss'],
})
export class CreateListPage implements OnInit 
{
  productsList=[] // array of id products at this list
  map= new Map()
  nameList: string
  idAccount: Number;
  list= new ListForChange()
  arrProductsInList: Products[] = []
  constructor(private _location: Location, private router: Router, private route:ActivatedRoute,private listService:ListsService, private productService:ProductsService, private alertController: AlertController) 
  {
    this.route.params.subscribe(params => 
      {
       console.log(Array.of(params['productsList'])) 
       if(params['productsList'] != undefined)
       {
        this.productsList=(params['productsList'].split(',')).map(x=>+x);
        this.getProductsById()
       }
      });
 }

  ngOnInit() 
  {
    this.idAccount =+ localStorage.getItem('accountId') 
  }

  goProductsList()
  {
     this.router.navigate(['products',{"productsInList": this.productsList}])
  }

  saveList()
  {
    this.presentAlertPromptCategory()
  }

  // alert for save new list
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
          this.listService.addProductsToList(this.idAccount,this.list).subscribe((res) => { this.router.navigateByUrl('types-list') });
         }
       }
     ]
   });
   console.log(alert.inputs.length)
   await alert.present();
 }

// get products details by their id that came from products page
  getProductsById()
  {
    this.productService.getProductsByIdProduct(this.productsList).subscribe((res) => 
      {
        Object.keys(res).forEach( key => { this.map.set(key, res[key]); } );
      });
  }
}
