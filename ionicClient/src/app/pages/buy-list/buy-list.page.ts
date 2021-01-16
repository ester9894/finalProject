import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { type } from 'os';
import { buyList } from 'src/app/shared/models/buyList.model';
import { List } from 'src/app/shared/models/list.model';
import { Products } from 'src/app/shared/models/products.model';
import { ProductsToTypeList } from 'src/app/shared/models/products_to_type_list.model';
import { ProductToList } from 'src/app/shared/models/product_to_list.model';
import { TypeList } from 'src/app/shared/models/type_list.model';
import { FollowUpService } from 'src/app/shared/services/follow-up.service';
import { ListsService } from 'src/app/shared/services/lists.service';
import { GroupByPipe } from 'src/app/group-by.pipe';
@Component({
  selector: 'app-buy-list',
  templateUrl: './buy-list.page.html',
  styleUrls: ['./buy-list.page.scss'],
})
export class BuyListPage implements OnInit {
  userId= + localStorage.getItem('userId')
  listDetails: TypeList = new TypeList()
  productsList = []; // products of this buy list
  arrProductsBuy = [];// products which are bought
  followProductsList =[]// follow list of account
  buyList: buyList = new buyList()
  list:List
  groupByCategory = []// productsList groupby categories
  categories : any// arr of products category
  constructor(private listsService: ListsService, private followUpService: FollowUpService, private route: ActivatedRoute, private alertController: AlertController, private router: Router) 
  {
    // restart data from previous page
    this.route.params.subscribe(params => 
      { 
        this.listDetails.AccountId =+ localStorage.getItem('accountId')
        this.listDetails.TypeListId= params['typeListId']; 
        this.listDetails.TypeListName = params['typeListName']; 
        this.buyList.ListId=params['listId'];
        this.listDetails.AccountId =+ localStorage.getItem('accountId')
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
    this.listsService.GetAllActiveProductOfList(this.buyList.ListId).subscribe((list) => {
      this.productsList = list
      console.log(this.productsList)
      this.categories = this.productsList.map(item => item.CategotyName); //מערך של קטגוריות המוצרים שברשימה
      this.categories = this.categories.filter(function(elem, index, self) {return index === self.indexOf(elem);})// מסנן את המערך שלא יהיו כפילויות
      this.groupByCategory = [];
      this.categories.forEach(category => 
      this.groupByCategory.push({'CategoryName': category, 'values': this.productsList.filter(i => i.CategotyName == category)}))
      this.productsList = [].concat.apply([], this.groupByCategory.map(f=> f.values));
    })
  }

// add all selected products to array and if there are selected products, update them on DB
  finishShopping()
  {
    this.productsList.forEach(product => 
    { 
        if(product.isChecked == true)
          this.arrProductsBuy.push(product) 
    });
    console.log(this.arrProductsBuy)
    if(this.arrProductsBuy.length)
    {
      this.buyList.userId = this.userId
      this.buyList.typeListId = this.listDetails.TypeListId
      this.buyList.products = this.arrProductsBuy
      this.listsService.updateBuyList(this.buyList).subscribe(res=>
        {
          this.showMessage("הקניה בוצעה בהצלחה")
          this.router.navigate(['home-page']);
        });
    }
    else
    {
      this.showMessage('לא קנית כלום??!!')
    }  
  }

  // alert message about shopping status
  async showMessage(mess: string)
  {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: mess,
      buttons: ['המשך']
    });
    await alert.present();
  }

  // alert check amount of follow product which select
  async showAlertSelectAmount(product: ProductsToTypeList)
  {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: "כמה קנית מהמוצר הזה?",
      inputs: [{ 
                type:"number",
                placeholder: 'כמות',
                min: 1,
                name:'amount' 
              }]
      ,
      buttons: [{
                text: 'המשך',
                handler: (alertData) => { product.Amount = alertData.amount }
               }]   
    });
    await alert.present();
  }

// if this selected product is followed check amount of buy
  checkIfFollowProduct(product: any)
  {
    if(!product.isChecked)
      for (let arr of this.followProductsList) {
        arr.forEach(pro => { if(pro.ProductId == product.ProductId) {this.showAlertSelectAmount(product)}
      });
   }
  }
}
