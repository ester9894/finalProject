import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from '@angular/core';

import { AccountsService } from 'src/app/shared/services/accounts.service';
import { Account } from 'src/app/shared/models/account.model';
import { identifierModuleUrl } from '@angular/compiler';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.page.html',
  styleUrls: ['./add-account.page.scss'],
})
export class AddAccountPage implements OnInit {
  account: Account = new Account();
  userName: string;
  forUpdateFollowList: true


  constructor(private alertCtrl: AlertController, private accountService: AccountsService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.account.ManagerId = +localStorage.getItem('userId')
      this.userName = params.get("userName")

    })
  }

  addAccount() {
    this.accountService.addAccount(this.account).subscribe((accountId) => {

      if (accountId != 0) {
        localStorage.setItem('accountId', accountId.toString())

        this.accountService.addUserAccount(this.account.ManagerId, accountId).subscribe((res) => {

        });
       this.router.navigate(['products', {"isForUpdateFollowList":this.forUpdateFollowList}]);

      }
      else
        this.presentAlert();
    })

  }

  async presentAlert() {
    let alert = this.alertCtrl.create({
      //title: 'Low battery',
      message: 'שם חשבון זה קיים במערכת, נא הקש שם חדש',
      buttons: ['הבנתי']
    });
    (await alert).present();
  }
}
