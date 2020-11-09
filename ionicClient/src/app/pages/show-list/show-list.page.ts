import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  amount:number
  productsList: Array<ProductsToTypeList>;
  constructor(private route: ActivatedRoute, private router: Router, private listsService: ListsService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.typeListId = +params.get("typeListId")
      this.typeListName = params.get("TypeListName")
      this.listsService.GetAllProductsByTypeId(this.typeListId).subscribe((list) => {
        this.productsList = list;
        console.log(this.productsList);
        console.log(this.typeListName);
      })
    })

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
  up(){
    this.amount++
  }
  down(){
    this.amount--;
  }
}
