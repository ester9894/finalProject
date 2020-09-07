import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Products } from '../models/products.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) { }

  AddProduct(product: Products):Observable<boolean>
   {
    return this.http.post<boolean>(environment.url + 'products/AddProduct', product)
  }

  GetNumProduscts():Observable<number>
   {
    return this.http.get<number>(environment.url + 'products/GetNumProduscts')
  }
}
