import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.page.html',
  styleUrls: ['./create-list.page.scss'],
})
export class CreateListPage implements OnInit {
  productsList = new Array()
  constructor(private router: Router, private route:ActivatedRoute, private productsService:ProductsService) 
  {
    this.route.params.subscribe(params => 
      {
        console.log(Array.of(params['undefinedProducts'])) 
        console.log(params['productsList'].split(','))
        params['productsList'].split(',').forEach(element => { this.productsList.push(element) });
      });
 }

  ngOnInit() 
  {
    this.productsService.getProductsByIdProduct(this.productsList)
  }

  goProductsList()
  {
    this.router.navigateByUrl('products')
  }
}
