import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { AccountsService } from 'src/app/shared/services/accounts.service';
import { UsersAccount } from 'src/app/shared/models/users_account.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
userAccount: UsersAccount = new UsersAccount();
loginForm: FormGroup;
  constructor(private accountService: AccountsService, private router: Router) { }

  ngOnInit() {
  }
  login(form){
    this.accountService.login(form.value).subscribe((res)=>{
      this.router.navigateByUrl('home');
    });
  }
}
