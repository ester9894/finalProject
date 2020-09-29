import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/models/category.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
//categories:Array<Category>=new Array<Category>();
  constructor() { }

  ngOnInit() {
  }

}
