import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { buyList } from '../models/buyList.model';
import { List } from '../models/list.model';
import { ListForChange } from '../models/list_for_change';
import { ProductsToTypeList } from '../models/products_to_type_list.model';
import { ProductToList } from '../models/product_to_list.model';
import { TypeList } from '../models/type_list.model';

@Injectable({
  providedIn: 'root'
})
export class ListsService 
{
  
  constructor(private http: HttpClient) { }

  addList(list: List):Observable<boolean> {
    return this.http.post<boolean>(environment.url + 'lists/addList', list)
   
  }
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

  updateBuyList(buyList:buyList):Observable<boolean> 
  {
    return this.http.post<boolean>(environment.url + 'lists/updateBuyList/' ,buyList)
  }

  GetAllActiveLists(accountId:Number):Observable<List[]>
  {
    return this.http.get<List[]>(environment.url + `/lists/GetAllActiveLists/${accountId}`)
  }

}
