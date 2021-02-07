import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AccountsService } from 'src/app/shared/services/accounts.service';
import { UsersAccount } from 'src/app/shared/models/users_account.model';
import { FormGroup } from '@angular/forms';
import { Login } from 'src/app/shared/models/login.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userLogin: Login = new Login();
  loginForm: FormGroup;
  constructor(private accountService: AccountsService, private router: Router, private alertCtrl: AlertController) { }

  ngOnInit() {}

  checkLogin() 
  {
    this.accountService.checkLogin(this.userLogin).subscribe((userAccount) => {
      localStorage.setItem('userId', userAccount.UserId.toString())
      localStorage.setItem('accountId', userAccount.AccountId.toString())
      // if(localStorage.getItem('lastDate')==null )
      // localStorage.setItem('lastDate',JSON.stringify(new Date(1,1,2000)))

      this.router.navigateByUrl('home-page');
    }, err => this.presentAlert());
  }

  async presentAlert() 
  {
    let alert = this.alertCtrl.create({
      //title: 'Low battery',
      message: 'פרטי המשתמש שגויים',
      buttons: ['הבנתי']
    });
    (await alert).present();
  }

}
