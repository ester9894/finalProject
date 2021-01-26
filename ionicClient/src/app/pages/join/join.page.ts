import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AccountsService } from '../../shared/services/accounts.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.page.html',
  styleUrls: ['./join.page.scss'],
})
export class JoinPage implements OnInit {

  constructor(private accountService: AccountsService, private router: Router, private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  checkPass(pass, accountName) {

    this.accountService.checkPass(pass, accountName).subscribe((accountId) => {

      if (accountId != 0) {
        localStorage.setItem('accountId', accountId.toString())
        localStorage.setItem('lastDate', JSON.stringify(Date.now()))
        this.accountService.addUserAccount(+localStorage.getItem('userId'), +localStorage.getItem('accountId')).subscribe(() => {
          this.router.navigate(['home-page', {'status': true}]);
        });
      }
      else
        this.presentAlert();
    })
  }

  async presentAlert() {
    let alert = this.alertCtrl.create({
      //title: 'Low battery',
      message: 'פרטי החשבון שגויים',
      buttons: ['הבנתי']
    });
    (await alert).present();
  }
}
