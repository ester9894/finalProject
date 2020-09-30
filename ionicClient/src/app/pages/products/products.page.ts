import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/models/category.model';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
//categories:Array<Category>=new Array<Category>();
  constructor(private productService:ProductsService) { }

  ngOnInit() {
      this.productService.getAllProducts().subscribe(res=>console.log(res));
  }



}
