import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Products } from '../models/products.model';

@Injectable({
  providedIn: 'root'
})
export class FollowUpService 
{
  constructor(private http: HttpClient) { }

  saveList(idSelectedProducts: Number[], idAccount: Number):Observable<boolean> 
  {
    return this.http.post<boolean>(environment.url + 'FollowUp/saveList', [idSelectedProducts, idAccount])
  }

  getListById(idAccount: Number) :Observable<{ [id: string]: Products[] }>
   {
     return this.http.get<{ [id: string]: Products[] }>(environment.url + 'products/getListById')
   }
}
