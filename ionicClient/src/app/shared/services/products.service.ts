import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Products } from '../models/products.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductsService
 {
  constructor(private http: HttpClient) { }

  AddProduct(product: Products):Observable<boolean>
   {
    return this.http.post<boolean>(environment.url + 'products/AddProduct', product)
  }

  AddProductForProduct(product: Products,accountId:number):Observable<boolean>
   {
    return this.http.post<boolean>(environment.url + 'products/AddProductForAccount/'+accountId, product)
  }

  GetNumProducts():Observable<number>
   {
    return this.http.get<number>(environment.url + 'products/GetNumProducts')
  }

  getAllProducts():Observable<{ [id: string]: Products[] }>
  {
    return this.http.get<{ [id: string]: Products[] }>(environment.url + 'products/GetAllProducts')
  }

  getProductsByIdProduct(idproducts: Number[]):Observable<Products[]>
  {
    return this.http.get<Products[] >(environment.url + 'products/GetProductsByIdProduct/'+idproducts)
  }

}
