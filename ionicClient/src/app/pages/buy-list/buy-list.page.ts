import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { type } from 'os';
import { buyList } from 'src/app/shared/models/buyList.model';
import { Products } from 'src/app/shared/models/products.model';
import { ProductsToTypeList } from 'src/app/shared/models/products_to_type_list.model';
import { ProductToList } from 'src/app/shared/models/product_to_list.model';
import { TypeList } from 'src/app/shared/models/type_list.model';
import { FollowUpService } from 'src/app/shared/services/follow-up.service';
import { ListsService } from 'src/app/shared/services/lists.service';

@Component({
  selector: 'app-buy-list',
  templateUrl: './buy-list.page.html',
  styleUrls: ['./buy-list.page.scss'],
})
export class BuyListPage implements OnInit {
  userId= + localStorage.getItem('userId')
  listDetails: TypeList = new TypeList()
  productsList = [];
  arrProductsBuy = [];
  followProductsList =[]
  buyList: buyList = new buyList()
  constructor(private listsService: ListsService, private followUpService: FollowUpService, private route: ActivatedRoute, private alertController: AlertController) 
  {
    this.route.params.subscribe(params => 
      {
        this.listDetails.AccountId =+ localStorage.getItem('accountId')
        this.listDetails.TypeListId= params['typeListId']; 
        this.listDetails.TypeListName = params['typeListName']; 
      
    
      });
  }

  ngOnInit() 
  {
    this.getAllProducts()
    this.getFollowProductsList()
  }

  getFollowProductsList()
  {
    this.followUpService.getSortedFolowList(this.listDetails.AccountId).subscribe((list) => {
    this.followProductsList = list;
    console.log(this.followProductsList)
   })
  }  
  getAllProducts()
  {
    this.listsService.GetAllProductsByTypeId(this.listDetails.TypeListId).subscribe((list) => {
      this.productsList = list;
      console.log(this.productsList)
    })
  }

  finishShopping()
  {
    // get name Categories
    this.productsList.forEach(product => 
    { 
        if(product.isChecked == true)
          this.arrProductsBuy.push(product.ProductId) 
    });
    console.log(this.arrProductsBuy)
    if(this.arrProductsBuy.length)
    {
      this.buyList.userId = this.userId
      this.buyList.typeListId = this.listDetails.TypeListId
      this.buyList.products = this.productsList
      this.listsService.updateBuyList(this.buyList).subscribe(res=>
        {
          this.showMessage("הקניה בוצעה בהצלחה")
        });
    }
    else
    {
      this.showMessage('לא קנית כלום??!!')
    }  
  }

  async showMessage(mess: string)
  {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: mess,
      buttons: ['המשך']
    });
    await alert.present();
  }

  async showAlertSelectAmount(product: ProductsToTypeList)
  {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: "כמה קנית מהמוצר הזה?",
      inputs: 
      [{
          type:"number",
          placeholder: 'כמות',
          min: 1,
          name:'amount' 
      }]
      ,
      buttons: [{
        text: 'סגור',
        handler: (alertData) => 
        {
          product.Amount = alertData.amount
        }
      }]
      
    });
    await alert.present();
  }

  checkIfFollowProduct(product: any)
  {
    if(!product.isChecked)
      for (let arr of this.followProductsList) {
        arr.forEach(pro => { if(pro.ProductId == product.ProductId) {this.showAlertSelectAmount(product)}
      });
     
   }
  }
}
