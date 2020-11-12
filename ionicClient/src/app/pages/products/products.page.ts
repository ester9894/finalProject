import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';
import { combineAll, first, ignoreElements } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { FollowUpService } from 'src/app/shared/services/follow-up.service';
import { Products } from 'src/app/shared/models/products.model';
import { AlertController } from '@ionic/angular';
import { SelectorMatcher } from '@angular/compiler';
import { parse } from 'path';
// הערה
@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  o = new Object() // contain all products from database include thair categories
  arrKind = new Array()// categories products
  arrProducts = new Array() // all products
  arrProducts1 = new Array()// copy all products
  search: string // value of searchbar
  selectedsArray = []; // list of all categories that contain also selected products (matriza)
  allSelectedProducts = []// contain all products are selected
  idAccount: Number
  newProduct: Products
  isPageForUpdateFollowList: boolean
  selectedProducts=[1001,1008];
  addProductsToList:boolean
  typeListId: number;
  typeListName: string;

  constructor(private productService: ProductsService, private followUpService: FollowUpService, private router: Router, private route: ActivatedRoute, private alertController: AlertController) 
  {   
      this.route.params.subscribe(params => {
      this.isPageForUpdateFollowList = params['isForUpdateFollowList']; 
      this.addProductsToList=params['addProducts']
      this.typeListId = +params['typeListId']
      this.typeListName = params['typeListName']
      console.log(this.addProductsToList);
      
    });
    console.log(this.isPageForUpdateFollowList)
  }
  
  ngOnInit() 
  {
    this.idAccount =+ localStorage.getItem('accountId')
    console.log(this.idAccount )

    // create arr of categories and arr of all products
    this.productService.getAllProducts().subscribe(res => 
    {
      console.log(res);
      this.o = Array.of(res)
      console.log(this.o);
      Object.keys(res).forEach(element => 
      {
        // console.log(element)
        this.arrKind.push(element)
         console.log(this.arrKind)
      });

      Object.values(res).forEach(element => 
      {
        // console.log(element)
        this.arrProducts.push(element)
        // console.log(this.arrProducts)
      });
    });
    this.arrProducts1 = this.arrProducts // copy for searchbar
  }


  // filter func for searchbar
  async filterList(evt) {

    this.arrProducts = this.arrProducts1;
    const searchTerm = evt.srcElement.value;

    if (!searchTerm) { return; }

    for (let i = 0; i < this.arrProducts.length; i++) {
      this.arrProducts[i] = this.arrProducts[i].filter(item => item.ProductName.indexOf(searchTerm) !== -1)
    }
  }
// add product to follow for this account
async presentAlertPromptNewProduct() 
 {
  var alert = await this.alertController.create(
    {
    cssClass: 'my-custom-class',
    header: 'הכנס מוצר',
    inputs:
    [{
        type:"textarea",
        placeholder: 'מוצר חדש',
        name:'textarea',
    }],
    buttons: 
    [
      {
        text: 'ביטול',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {console.log('Confirm Cancel');}
      }, {
        text: 'שמור',
        handler: (alertData) => 
        {
          console.log(alertData.textarea)
          this.presentAlertPromptCategory()
        }
      }
    ]
  });
  await alert.present();
}


 async presentAlertPromptCategory() 
 {
   let alertInputs=[];
   this.arrKind.forEach(element => 
    { 
      alertInputs.push({name:element, type:'radio', value:element, label: element})
    });
    var alert = await this.alertController.create(
    {
    cssClass: 'my-custom-class',
    header: 'בחר קטגוריה',
    inputs:alertInputs,
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
          console.log(alertData)
          console.log('Confirm Ok');
        }
      }
    ]
  });
  
  console.log(alert.inputs.length)
  await alert.present();
}


  // update follow up list 
  saveList() 
  {
    for (let i = 0; i < this.selectedsArray.length; i++)// over all Categories for checking which Categories are selected items
    {
      if (this.selectedsArray[i] != null)// if seleced items in this Categories so
      {
        this.selectedsArray[i].forEach(idProduct=> { this.allSelectedProducts.push(idProduct) }); // push products the costumer is choose to array 
      }
    }
    console.log(this.allSelectedProducts)
    // send for adding
    if(this.isPageForUpdateFollowList)
     {
      this.followUpService.saveList(this.allSelectedProducts, this.idAccount).subscribe((res) => {
        this.router.navigate(['follow-list']);
       });
     }
     else if(this.addProductsToList){
      this.router.navigate(['show-list',{"status":"true", "allSelectedProducts":JSON.stringify(this.allSelectedProducts),"typeListId":this.typeListId, "typeListName":this.typeListName}]);
     }
     else
     {
      this.router.navigate(['create-list/allSelectedProducts']);
     }
  }
}


