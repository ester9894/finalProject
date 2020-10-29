import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AccountsService } from 'src/app/shared/services/accounts.service';
import { UsersAccount } from 'src/app/shared/models/users_account.model';
import { FormGroup } from '@angular/forms';
import { Login } from 'src/app/shared/models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userLogin: Login = new Login();
  loginForm: FormGroup;
  constructor(private accountService: AccountsService, private router: Router) { }

  ngOnInit() {
  }
  checkLogin() {
    this.accountService.checkLogin(this.userLogin).subscribe((userAccount) => {
      localStorage.setItem('userId', userAccount.UserId.toString())
      localStorage.setItem('accountId', userAccount.AccountId.toString())

      this.router.navigateByUrl('home-page');
    }, err => alert("שם משתמש או סיסמה שגויים"));
  }


  checkPass(pass, accountName) {
    console.log(pass + " " + accountName);

    this.accountService.checkPass(pass, accountName).subscribe((accountId) => {
      console.log(accountId);
      localStorage.setItem('accountId', accountId.toString())

      if (accountId != 0)
        this.router.navigate(['register']);
      //this.router.navigate(['register',{"accountId":accountId}]);

      else
        alert("פרטי החשבון שגויים")
    })
  }
}
