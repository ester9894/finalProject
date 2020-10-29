import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { FollowUpService } from 'src/app/shared/services/follow-up.service';
import { Products } from 'src/app/shared/models/products.model';
// הערה
@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  o = new Object() // contain all products from database include thair categories
  arrKind = new Array()// categories products
  arrProducts = new Array() // all products
  arrProducts1 = new Array()// copy all products
  search: string // value of searchbar
  selectedsArray = []; // list of all categories that contain also selected products (matriza)
  allSelectedProducts = []// contain all products are selected
  idAccount: Number

  constructor(private productService: ProductsService, private followUpService: FollowUpService, private router: Router, private activatedRoute: ActivatedRoute) {
    // this.activatedRoute.paramMap.subscribe(params => { this.idAccount = +params.get("id") })
    //localStorage במקום
  }
  ngOnInit() {

    this.idAccount =+ localStorage.getItem('accountId')

    // create arr of categories and arr of all products
    this.productService.getAllProducts().subscribe(res => {
      console.log(res);
      this.o = Array.of(res)
      console.log(this.o);
      Object.keys(res).forEach(element => {
        // console.log(element)
        this.arrKind.push(element)
        // console.log(this.arrKind)
      });

      Object.values(res).forEach(element => {
        // console.log(element)
        this.arrProducts.push(element)
        // console.log(this.arrProducts)
      });
    });
    this.arrProducts1 = this.arrProducts // copy for searchbar
  }
  // filter func for searchbar
  async filterList(evt) {

    this.arrProducts = this.arrProducts1;
    const searchTerm = evt.srcElement.value;

    if (!searchTerm) { return; }

    for (let i = 0; i < this.arrProducts.length; i++) {
      this.arrProducts[i] = this.arrProducts[i].filter(item => item.ProductName.indexOf(searchTerm) !== -1)
    }
  }

  // update follow up list 
  saveList() {
    for (let i = 0; i < this.selectedsArray.length; i++)// over all Categories for checking which Categories are selected items
    {
      if (this.selectedsArray[i] != null)// if seleced items in this Categories so
      {
        this.selectedsArray[i].forEach(idProduct => { this.allSelectedProducts.push(idProduct) }); // push products the costumer is choose to array 
      }
    }
    console.log(this.allSelectedProducts)
    // send for adding
    this.followUpService.saveList(this.allSelectedProducts, this.idAccount).subscribe((res) => {
      this.router.navigate(['follow-list', { "AccountId": this.idAccount }]);
    });
  }
}


