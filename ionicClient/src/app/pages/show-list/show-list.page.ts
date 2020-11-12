import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { List } from 'src/app/shared/models/list.model';
import { Products } from 'src/app/shared/models/products.model';
import { ProductsToTypeList } from 'src/app/shared/models/products_to_type_list.model';
import { ListsService } from 'src/app/shared/services/lists.service';

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
  constructor(private route: ActivatedRoute, private router: Router, private listsService: ListsService) { }

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

      this.listsService.GetAllProductsByTypeId(this.typeListId).subscribe((list) => {
        this.productsList = list;


        console.log(this.productsList);
        console.log(this.typeListName);
      })
    })

  }

  addNewProductsToList(typeListId: number) {
    this.listsService.addNewProductsToList(this.newProducts, typeListId).subscribe((res) => {
      alert("המוצרים נוספו בהצלחה")
    })
  }


  updateList() {
    this.listsService.updateList(this.productsList, this.typeListId).subscribe((res) => {
      alert("השינויים נשמרו")
    })
    this.router.navigate(['show-list', { "status": "false", "typeListId": this.typeListId, "typeListName": this.typeListName }]);

    //this.router.navigateByUrl('types-list');
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
      alert("המוצר נמחק")
    })
    this.router.navigate(['show-list', { "status": "false", "typeListId": this.typeListId, "typeListName": this.typeListName }]);

  }
}
