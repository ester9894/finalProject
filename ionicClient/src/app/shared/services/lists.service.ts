import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListForChange } from '../models/list_for_change';
import { ProductsToTypeList } from '../models/products_to_type_list.model';
import { ProductToList } from '../models/product_to_list.model';
import { TypeList } from '../models/type_list.model';

@Injectable({
  providedIn: 'root'
})
export class ListsService {
  updateBuyList(typeListId: number, userId: number, productsList: ProductToList[]):Observable<boolean> {
    return this.http.post<boolean>(environment.url + 'lists/updateBuyList/',{userId, typeListId, productsList})
  }
 
  constructor(private http: HttpClient) { }

  GetAllTypesList(accountId: number): Observable<TypeList[]> {
    return this.http.get<TypeList[]>(environment.url + `/lists/GetAllTypesList/${accountId}`)

  }

  GetAllProductsByTypeId(typeListId: number): Observable<ProductsToTypeList[]> {
    return this.http.get<ProductsToTypeList[]>(environment.url + `/lists/GetAllProductsByTypeId/${typeListId}`)

  }

  updateList(productsList: Array<ProductsToTypeList>, typeListId: number): Observable<boolean> {
    console.log(productsList,typeListId);
    
    return this.http.post<boolean>(environment.url + `lists/updateList/${typeListId}`,productsList)
  }

  addNewProductsToList(newProducts:number[], typeListId: number): Observable<boolean>{
    return this.http.post<boolean>(environment.url + `lists/addNewProductsToList/${typeListId}`,newProducts)
  }

  removeProduct(TypeListId: number, ProductId: number): Observable<boolean> {
    return this.http.get<boolean>(environment.url + `lists/removeProduct/${TypeListId}/${ProductId}`)
  }

  addProductsToList(accountId: Number, listForAdd: ListForChange) :Observable<boolean>
  {
    return this.http.post<boolean>(environment.url + `/lists/addProductsToList/${accountId}`,listForAdd)
  }
}
