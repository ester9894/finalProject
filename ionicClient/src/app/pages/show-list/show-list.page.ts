import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { List } from 'src/app/shared/models/list.model';
import { Products } from 'src/app/shared/models/products.model';
import { ProductsToTypeList } from 'src/app/shared/models/products_to_type_list.model';
import { ListsService } from 'src/app/shared/services/lists.service';
import { AlertController } from '@ionic/angular';

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
  constructor(private route: ActivatedRoute, private router: Router, private listsService: ListsService, public alertController: AlertController) { }



  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.addProductsToList = JSON.parse(params.get('status'))
      console.log(this.addProductsToList);

      if (this.addProductsToList == true) {

        console.log(this.addProductsToList);

        this.newProducts = JSON.parse(params.get('allSelectedProducts'))
        console.log('המוצרים החדשים ' + this.newProducts);

        this.addNewProductsToList(+params.get("typeListId"));
        this.router.navigate(['show-list', { "status": "false", "typeListId": +params.get("typeListId"), "typeListName": params.get("typeListName") }])
      }
      this.typeListId = +params.get("typeListId")
      this.typeListName = params.get("typeListName")

      this.getAllProducts();
    })

  }

  getAllProducts() {
    this.listsService.GetAllProductsByTypeId(this.typeListId).subscribe((list) => {
      this.productsList = list;
      console.log(this.productsList);
      console.log(this.typeListName);
    })
  }

  addNewProductsToList(typeListId: number) {
    this.listsService.addNewProductsToList(this.newProducts, typeListId).subscribe((res) => {
      //alert("המוצרים נוספו בהצלחה")
      this.getAllProducts();
    })
  }


  updateList() {

    this.listsService.updateList(this.productsList, this.typeListId).subscribe((res) => {
      this.getAllProducts();
    })

    this.router.navigate(['show-list', { "status": "false", "typeListId": this.typeListId, "typeListName": this.typeListName }]);

  }
  addProducts() {
    this.addProductsToList = true;
    this.router.navigate(['products', { "addProducts": true, "typeListId": this.typeListId, "typeListName": this.typeListName }]);
  }

  back() {
    this.router.navigateByUrl('types-list')
  }

  removeProduct(TypeListId: number, ProductId: number) {
    this.listsService.removeProduct(TypeListId, ProductId).subscribe((res) => {
      this.getAllProducts();
      this.presentAlert();
    })
    this.router.navigate(['show-list', { "status": "false", "typeListId": this.typeListId, "typeListName": this.typeListName }]);

  }

  async presentAlert() {
    let alert = this.alertController.create({
      //title: 'Low battery',
      message: 'המוצר הוסר בהצלחה',
      buttons: ['הבנתי']
    });
    (await alert).present();
  }


  toBuy() {
    this.presentAlertToBuy();
  }


  async presentAlertToBuy() {
    var alert = await this.alertController.create(
      {
        cssClass: 'my-custom-class',
        header: 'הכנס תאריך לסיום הקניה',
        inputs: [{ type: 'date', name: 'endDate' }],
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
}
