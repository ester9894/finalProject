import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductsToTypeList } from '../models/products_to_type_list.model';
import { TypeList } from '../models/type_list.model';

@Injectable({
  providedIn: 'root'
})
export class ListsService {


  constructor(private http:HttpClient) { }

  GetAllTypesList(accountId: number):Observable<TypeList[]> {
      return this.http.get<TypeList[]>(environment.url+`/lists/GetAllTypesList/${accountId}`)
  
    }

    GetAllProductsByTypeId(typeListId: number):Observable<ProductsToTypeList[]> {
return this.http.get<ProductsToTypeList[]>(environment.url+`/lists/GetAllProductsByTypeId/${typeListId}`)

    }
}
