import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { followUpList } from '../models/follow_up_list.model';
import { Products } from '../models/products.model';

@Injectable({
  providedIn: 'root'
})
export class FollowUpService 
{
  
  getSortedFolowList(idAccount: Number) :Observable<Products[]>{
    return this.http.get<Products[]>(environment.url + `/followUp/getSortedFolowList/${idAccount}`)
  }
  

  constructor(private http: HttpClient) { }

  saveList(idSelectedProducts: Number[], accountId: Number):Observable<boolean> 
  {
    return this.http.post<boolean>(environment.url + `followUp/saveList/${accountId}`, idSelectedProducts)
  }

  getListById(idAccount: Number) :Observable<{ [id: string]: followUpList[] }>
   {
     return this.http.get<{ [id: string]: followUpList[] }>(environment.url + `/followUp/getListById/${idAccount}`)
   }

   removeFromList(idSelectedProducts: Number[], accountId:Number):Observable<boolean> 
   {
    return this.http.post<boolean>(environment.url + `followUp/removeFromList/${accountId}`, idSelectedProducts)
   }
}
