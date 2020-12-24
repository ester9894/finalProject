import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';
import { combineAll, first, ignoreElements, mapTo } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { FollowUpService } from 'src/app/shared/services/follow-up.service';
import { Products } from 'src/app/shared/models/products.model';
import { AlertController } from '@ionic/angular';
import { ListsService } from 'src/app/shared/services/lists.service';
import {Location} from '@angular/common'
import { Key } from 'protractor';
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
  selectedsArray= [] // list of all categories that contain also selected products (matriza)
  allSelectedProducts = []// contain all products are selected
  idAccount: Number
  newProducts:Products[]= new Array()
  isPageForUpdateFollowList: boolean
  categoryProduct: number;
  nameProduct: string;
  currentItems =new Array()
  map= new Map()
  newListId = []
  addProductsToList:boolean
  typeListId: number;
  typeListName: string;
  selectedItemsLength: Number

  constructor(private _location: Location, private productService: ProductsService, private followUpService: FollowUpService, private listService: ListsService, private router: Router, private route: ActivatedRoute, private alertController: AlertController) 
  {   
      this.route.params.subscribe(params => 
      {
        this.isPageForUpdateFollowList = params['isForFollowList']; 
        this.addProductsToList=params['addProducts']
        this.typeListId = +params['typeListId']
        this.typeListName = params['typeListName']
        if(params['productsInList'] != undefined)
      {
        this.allSelectedProducts =(params['productsInList'].split(',')).map(x=>+x);
      }
          
    });
  }
  
  ngOnInit() 
  {
    this.idAccount =+ localStorage.getItem('accountId')
    console.log(this.idAccount)  
    // create arr of categories and arr of all products
    this.productService.getAllProducts(this.idAccount).subscribe(res => 
    {
     // console.log(res);
      this.o = Array.of(res)
      console.log(this.o);
      this.selectedItemsLength = this.selectedsArray.length
      Object.keys(res).forEach(element => 
      {
        // console.log(element)
        this.arrKind.push(element)
        console.log(this.arrKind)
        if(this.selectedItemsLength == 0)
          this.selectedsArray.push([])
      });
      this.selectedItemsLength = this.selectedsArray.length 

      Object.values(res).forEach(element => 
      {
        // console.log(element)
        this.arrProducts.push(element)
      });
         console.log(this.arrProducts)
    });
    this.arrProducts1 = this.arrProducts // copy for searchbar

    if(this.isPageForUpdateFollowList)
      this.followUpService.getSortedFolowList(this.idAccount).subscribe(res=>
      {
        this.selectedsArray=res;
        console.log(res)
      })
    else
    {
      this.selectedsArray=[]
      this.productService.getProductsByIdProduct(this.allSelectedProducts).subscribe((res) => 
      {
        Object.keys(res).forEach( key => { 
         this.map.set(key, res[key])
         let i = 0
        for (i = 0; i < this.arrKind.length && this.arrKind[i] != key ; i++);
        this.selectedsArray[i].push(this.map.get(key))
        } );
      });
    }
  }

  selectText(index)
  {
    let text
    if(this.selectedsArray[index]!= undefined)
      text=Object(this.selectedsArray[index]).map(s=>s.ProductName).toString()
    return text;
  }
  // filter func for searchbar
  getItems(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.currentItems = [];
      return;
    }
    this.query(val)
  }

  query(val?: any) 
  {
    this.currentItems = []
    if (!val) { return this.arrProducts; }
     return this.arrProducts.forEach(arr => 
      {
        arr.filter((item) => {
        for (let key in val) 
        {
          let field = item.ProductName[key];
          if (!(typeof field == 'string' && field.indexOf(val[key]) >= 0)) { return item.ProductName } 
          else if (!(field == val[key])) { return item.ProductName} 
        }
        this.currentItems.push(item)
        return null;
      });
    }); 
  }

// add product for this account
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
        text: 'המשך',
        handler: (alertData) => 
        {
          this.nameProduct = alertData.textarea
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
        text: 'הוסף',
        handler: (alertData) => 
        {
          this.categoryProduct = alertData;
          let p=new Products();
          p.ProductName=this.nameProduct;
          console.log(this.o[0][this.categoryProduct])
          p.CategoryId=this.o[0][this.categoryProduct][0].CategoryId
          this.newProducts.push(p)
        }
      }
    ]
  });
  
  console.log(alert.inputs.length)
  await alert.present();
}


addForSaveList(product: Products)// מעדכן את המוצר שנבחר מתיבת החיפוש - מוסיף או מסיר אותו אם לא קיים
{
  console.log(this.selectedsArray)
    for(let i=0; i<this.selectedsArray.length; i++) // תעבור על כל המוצרים שנבחרו (ממוינים לפי קטגוריות ואם יש קטגורין=ות שעוד אין להם מוצרים שנבחרו אז הם מערכים ריקים)
    {
      var j =0;
      console.log(this.selectedsArray[i])
      if(this.selectedsArray[i].length > 0)// אם נבחרו מוצרים מהקטגוריה הנוכחית
      {
        if(this.selectedsArray[i][0].CategoryName == product.CategoryName)//תבדוק אם המוצר שבחר מאותו קטגוריה
        {
          for(j=0; j<this.selectedsArray[i].length && this.selectedsArray[i][j].ProductId !=  product.ProductId; j++);//אם הם מאותו קטגוריה תבדוק אולי המוצר כבר קיים
          if(j === this.selectedsArray[i].length)// אם המוצר לא קיים אז תוסיף אותו
          {
            this.selectedsArray[i].push(product) 
            this.showAlert("המוצר נוסף")
            break
          } 
          else// אם קיים כבר אז תמחק אותו
          {
            this.selectedsArray[i].splice(j,1)
            console.log(this.selectedsArray)
            this.showAlert("המוצר הוסר")
            break      
          } 
        }     
      }
      else // אם לא נבחרו מוצרים מהקטגוריה של המוצר עוד
        if(this.arrProducts[i][0].CategoryName == product.CategoryName)    
          {
            this.selectedsArray[i].push(product) 
            this.showAlert("המוצר נוסף")
            break
          }
    }
    this.currentItems = []
}

async showAlert(message: string)
{
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    message: message,
    buttons: ['אישור']
  });
  await alert.present();
}
  // update follow up list 
  saveList() 
  {
  //  this.allSelectedProducts=[] לבדוק עם מוצרים מהרשימה אם מתווסף או מה
    for (let i = 0; i < this.selectedsArray.length; i++)// over all Categories for checking which Categories are selected items
    {
      if (this.selectedsArray[i] != null)// if seleced items in this Categories so
      {
       Object(this.selectedsArray[i]).forEach(pr=> 
          { 
            if(!this.allSelectedProducts.find(item=> item == pr.ProductId))
                this.allSelectedProducts.push(pr.ProductId) 
          }); // push products the costumer is choose to array 
      }
    }
    console.log(this.allSelectedProducts)
    // send for adding
    this.productService.addPersonalItems(this.newProducts,this.idAccount).subscribe((newProducts)=>
    {        
      newProducts.forEach(element => {if(element) this.newListId.push(element)});
      this.allSelectedProducts.push(...this.newListId)
      if(this.isPageForUpdateFollowList)
      {
       this.followUpService.saveList(this.allSelectedProducts, this.idAccount).
       subscribe((res) => { this.router.navigate(['follow-list']);});
      }
      else if(this.addProductsToList)
         {
           this.router.navigate(['show-list',{"status":"true", "allSelectedProducts":JSON.stringify(this.allSelectedProducts),"typeListId":this.typeListId, "typeListName":this.typeListName}]);
         }
       else
         {
           this.router.navigate(['create-list',{"productsList": this.allSelectedProducts}]);
         }
    });

  }
  compareById(o1,o2)
  {
    for(let p of o2)
    if(p.ProductId==o1.ProductId)
    return true;
    return false;
  }
}


