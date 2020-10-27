import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TypeList } from '../models/type_list.model';

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  constructor(private http:HttpClient) { }

  GetAllTypesList(accountId: number):Observable<TypeList[]> {
      return this.http.get<TypeList[]>(environment.url+`/lists/GetAllTypesList/${accountId}`)
  
    }
}
