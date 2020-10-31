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
  TypeListName: string;
  productsList: Array<ProductsToTypeList>;
  constructor(private route: ActivatedRoute, private router: Router, private listsService: ListsService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.typeListId = +params.get("typeListId")
       this.TypeListName = params.get("TypeListName")
      this.listsService.GetAllProductsByTypeId(this.typeListId).subscribe((list) => {
        this.productsList = list;
        console.log(this.productsList);
        console.log(this.TypeListName);
      })
    })

  }

}
