import { Component, OnInit } from '@angular/core';

import { AlertController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { User } from './shared/models/user.model';
import { UsersService } from './shared/services/users.service';
import { Account } from './shared/models/account.model';
import { AccountsService } from './shared/services/accounts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  idAccount: Number
  user: User = new User();
  account: Account = new Account();
  accountName: string
  accountsList: Account[]
  public appPages = [
    {
      title: 'הרשימות שלי',
      url: '/types-list',
      icon: 'list'

    },
    {
      title: 'רשימות פעילות',
      url: '/active-buy-list',
      icon: 'warning'
    },
    {
      title: 'רשימה חדשה',
      url: '/create-list',
      icon: 'create'
    },
    {
      title: 'מוצרים למעקב',
      url: '/follow-list',
      icon: 'alert'
    },
    {
      title: 'לוח התראות',
      url: '/home-page',
      icon: 'notifications'
    }

  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private userService: UsersService,
    private accountService: AccountsService,
    private alertController: AlertController,
    private router: Router
  ) {
    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {

      
     const path = window.location.pathname.split('login/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }

    if (this.IsUserLogedIn()) {
      this.userService.GetUser(+localStorage.getItem('userId')).subscribe((user) => {
        console.log(user);

        this.user = user;
      });

      this.accountService.GetAccount(+localStorage.getItem('accountId')).subscribe((account) => {
        console.log(account);

        this.account = account;
        this.accountName = account.AccountName.charAt(0);
      });

      this.accountService.GetAllAccountsByUser(+localStorage.getItem('userId')).subscribe((accounts) => {
        console.log(accounts);

        this.accountsList = accounts;
      })
    }
  
  }
  async presentAlertAccount() {
    let alertInputs = [];
    this.accountsList.forEach(element => {
      alertInputs.push({
        name: element.AccountId, type: 'radio', value: element.AccountId, label: element.AccountName,
        handler: (input) => {
          localStorage.setItem('accountId', input.value)
          this.router.navigateByUrl('home-page')
          console.log(input.value);
        },
        checked: element.AccountId == +localStorage.getItem('accountId'),
      })
    });
    var alert = await this.alertController.create(
      {
        cssClass: 'my-custom-class',
        header: 'החשבונות שלי',
        inputs: alertInputs,
        buttons:
          [
            {
              text: 'הוספת חשבון חדש',
              handler: () => {
                this.router.navigate(['add-account', { "userName": this.user.UserName }]);

              }
            },
            {
              text: 'הצטרפות לחשבון קיים',
              cssClass: 'secondary',
              handler: (alertData) => {
                this.router.navigateByUrl('join');

              }
            },
            {
              text: 'החלף משתמש',
              handler: (alertData) => {
                localStorage.clear();
                this.router.navigateByUrl('main');

              }
            } 
          ]
      });

    console.log(alert.inputs.length)
    await alert.present();
  }

  showAccounts() {
    console.log(this.account.AccountName);
    this.presentAlertAccount();
  }

  IsUserLogedIn() {
    return localStorage.getItem('userId') != null && localStorage.getItem('accountId') != null;
  }
}
