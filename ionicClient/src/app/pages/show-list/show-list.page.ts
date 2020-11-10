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
      if (this.addProductsToList == true) {

        this.newProducts = JSON.parse(params.get('allSelectedProducts'))
        console.log('המוצרים החדשים ' + this.newProducts);

        this.addProductsToList = false;
        this.addNewProductsToList();
      }
      this.typeListId = +params.get("typeListId")
      this.typeListName = params.get("typeListName")

      this.listsService.GetAllProductsByTypeId(this.typeListId).subscribe((list) => {
        this.productsList = list;

        console.log('המוצרים החדשים' + this.newProducts);

        console.log(this.productsList);
        console.log(this.typeListName);
      })
    })

  }

  addNewProductsToList() {
    this.listsService.addNewProductsToList(this.newProducts, this.typeListId).subscribe((res) => { })
  }
  updateList() {
    this.productsList = [{
      ProductId: 11004, TypeListId: 1, Amount: 2, ProductName: 'חסה'
    },
    {
      ProductId: 11019, TypeListId: 1, Amount: 3, ProductName: 'צלחות גדולות'
    }]
    this.listsService.updateList(this.productsList, this.typeListId).subscribe((res) => {
      //   this.router.navigate(['show-list', { "typeListId": this.typeListId , "TypeListName": this.typeListName}]);

    })
    this.router.navigateByUrl('types-list');

  }


  addProducts() {
    this.addProductsToList = true;
    this.router.navigate(['products', { "addProducts": true, "typeListId": this.typeListId, "typeListName": this.typeListName }]);

  }
}
