import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Login } from '../models/login.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http:HttpClient) { }

  addAccount(user: User)
  {
  this.http.post('', user)
  }

  checkLogin(user:Login):Observable<boolean> {
    return this.http.post<boolean>(environment.url + 'login/checkLogin', user)
   // return this.http.get<boolean>(environment.url + `login/checkLogin/${user.loginName}+${user.loginPassword}`)
  }
}

