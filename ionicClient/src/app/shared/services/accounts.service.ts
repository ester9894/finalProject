import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Login } from '../models/login.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Account } from '../models/account.model';
import { UsersAccount } from '../models/users_account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
 

  constructor(private http:HttpClient) { }

  addAccount(account:Account):Observable<number> {
  return this.http.post<number>(environment.url+'accounts/AddAccount',account)
  }

  addUserAccount(userId:number, accountId:number):Observable<number>{
    console.log("service:"+ userId);
    
  return this.http.get<number>(environment.url+`/accounts/addUserAccount/${userId}/${accountId}`)
}

  checkLogin(user:Login):Observable<UsersAccount> {
    return this.http.post<UsersAccount>(environment.url + 'login/checkLogin', user)
  }

  checkPass(pass: string, accountName:string):Observable<number> {
  //  return this.http.post<number>(environment.url + 'accounts/checkPass', pass)
    return this.http.get<number>(environment.url+`/accounts/checkPass/${pass}/${accountName}`)

  }
  
}

