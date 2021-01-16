import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { List } from 'src/app/shared/models/list.model';
import { Products } from 'src/app/shared/models/products.model';
import { ProductsToTypeList } from 'src/app/shared/models/products_to_type_list.model';
import { ListsService } from 'src/app/shared/services/lists.service';
import { AlertController } from '@ionic/angular';
import { getLocaleDateFormat } from '@angular/common';
import { newArray } from '@angular/compiler/src/util';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.page.html',
  styleUrls: ['./show-list.page.scss'],
})
export class ShowListPage implements OnInit {

  typeListId: number;
  typeListName: string;
  productsList: Array<ProductsToTypeList>;
  newProducts: number[]
  addProductsToList: boolean = false
  endDate: Date;
  list:List = new List()
  isTouched:boolean = false
 isSaveChanges: boolean = false
 

  constructor(private route: ActivatedRoute, private router: Router, private listsService: ListsService, public alertController: AlertController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.addProductsToList = JSON.parse(params.get('status'))
      this.typeListId = +params.get("typeListId")
      console.log(this.typeListId)
      this.typeListName = params.get("typeListName")
      this.getAllProducts()
      if (this.addProductsToList == true) 
      {
        this.newProducts = JSON.parse(params.get('allSelectedProducts'))
        console.log(this.newProducts);
        this.addNewProductsToList(this.typeListId);
      }
    })
  }

  getAllProducts() {
    this.listsService.GetAllProductsByTypeId(this.typeListId).subscribe((list) => {
      this.productsList = list;// המוצרים שנמצאים בדטה בייס
      
      console.log(this.productsList);
      console.log(this.typeListName);
    })
  }

  addNewProductsToList(typeListId: number) {
    this.listsService.addNewProductsToList(this.newProducts, typeListId).subscribe((res) => {
      //alert("המוצרים נוספו בהצלחה")       
           var arr = this.productsList.filter(item=>{ return !this.newProducts.includes(item.ProductId); });// כל המוצרים שנמצאים במערך אחד ולא נמצאים במערך השני
           arr.forEach(element => { this.removeProduct(this.typeListId, element.ProductId) });
      this.getAllProducts();
    })
  }


  updateList() 
  {
    this.listsService.updateList(this.productsList, this.typeListId).subscribe((res) => {this.getAllProducts();})
    this.addProductsToList = false
    this.isSaveChanges =true
    this.isTouched = false
  }

  addProducts() 
  {
    this.addProductsToList = true;
    this.router.navigate(['products', { "addProducts": true, "typeListId": this.typeListId, "typeListName": this.typeListName }]);
  }
  
  removeProduct(TypeListId: number, ProductId: number) 
  {
    this.listsService.removeProduct(TypeListId, ProductId).subscribe((res) => {
      this.getAllProducts();
      this.presentAlert();
    })
    this.router.navigate(['show-list', { "status": "false", "typeListId": this.typeListId, "typeListName": this.typeListName }]);
  }

  async presentAlert() 
  {
    let alert = this.alertController.create({
      message: 'המוצר הוסר בהצלחה',
      buttons: ['הבנתי']
    });
    (await alert).present();
  }


  toBuy() 
  { this.presentAlertToBuy();}

  async presentAlertToBuy() {
    var alert = await this.alertController.create(
      {
        cssClass: 'my-custom-class',
        header: 'הכנס תאריך לסיום הקניה',
        inputs: [{ type: 'date', name: 'endDate'}],
        buttons:
          [
            {
              text: 'ביטול',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => { console.log('Confirm Cancel'); }
            },
            {
              text: 'שמור',
              handler: (alertData) => {
                console.log(alertData.endDate)
                this.endDate = alertData.endDate
                this.list.TypeListId= this.typeListId
                this.list.EndDate = this.endDate
                this.listsService.addList(this.list).subscribe((listId) => {
                  this.router.navigate(['buy-list', { "endDate": this.endDate, "typeListId": this.typeListId ,"typeListName": this.typeListName, "listId":listId}]);
                })
              }
            }
          ]
      });
    await alert.present();
  }
  // כאשר אדם עורך את הרשימה שיוצג לו כפתור שמור עריכה וכאשר לוחץ על שמור רשימה יעלם הכפתור  
  touched()
  { 
    if(this.isTouched == true && this.isSaveChanges == true)
    {
      this.isTouched = false
      this.isSaveChanges =false 
    }
    else
      if(this.isTouched == false && this.isSaveChanges == true)
      {
       this.isTouched = true
       this.isSaveChanges =false 
      }
      else
        if((this.isTouched == true && this.isSaveChanges == false) || ((this.isTouched == false && this.isSaveChanges == false)))
        {
          this.isTouched = true
        }
  }
}
