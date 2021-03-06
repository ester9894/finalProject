import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Alert } from '../models/alert.model';
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
   creteAlerts(accountId: Number):Observable<boolean> 
   {
    return this.http.post<boolean>(environment.url + 'followUp/createAlerts', accountId)
   }
   getAlerts(accountId: Number):Observable<Alert[]> 
   {
    return this.http.get<Alert[]>(environment.url + `/followUp/getAlertsForAccount/${accountId}`)
   }
   CancelAlertOfProduct(alert:Alert):Observable<boolean>
   {
     return this.http.post<boolean>(environment.url + '/followUp/CancelAlertOfProduct', alert)
   }

   getForFutureBuyAlerts(accountId: Number):Observable<followUpList[]>
   {
    return this.http.get<followUpList[]>(environment.url + `/followUp/GetForFutureBuyAlerts/${accountId}`)
   }
}
