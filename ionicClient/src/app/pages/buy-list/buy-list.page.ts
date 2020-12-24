import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ProductsToTypeList } from 'src/app/shared/models/products_to_type_list.model';
import { TypeList } from 'src/app/shared/models/type_list.model';
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
  constructor(private listsService: ListsService, private route: ActivatedRoute, private alertController: AlertController) 
  {
    this.route.params.subscribe(params => 
      {
        this.listDetails = params['listDetails']; 
      //  this.listDetails.TypeListName="שלום"
      });
  }

  ngOnInit() 
  {
  }
  getAllProducts()
  {
    this.listsService.GetAllProductsByTypeId(this.listDetails.TypeListId).subscribe((list) => {
      this.productsList = list;
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
      this.listsService.updateBuyList(this.listDetails.TypeListId, this.userId, this.productsList).subscribe(res=>
        {
          this.showAlert("לא נעקוב אחר מוצרים אלו")
        });
    }
    else
    {
      this.showAlert('לא קנית כלום??!!')
    }  
  }

  async showAlert(mess: string)
  {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: mess,
      buttons: ['סגור']
    });
    await alert.present();
  }

}
