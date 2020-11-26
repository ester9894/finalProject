import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AccountsService } from 'src/app/shared/services/accounts.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { User } from 'src/app/shared/models/user.model';
import { Form, FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user: User = new User();
  loginForm: FormGroup;
  accountId: number;
  userId: number

  constructor(private alertCtrl: AlertController, private route: ActivatedRoute, private userService: UsersService, private router: Router, private accountService: AccountsService) {}

  ngOnInit() {

  }
  
  register() {
    // if (this.accountId != 0) {
    //   //משתמש נוסף לחשבון
    //   this.userService.addUser(this.user).subscribe((userId) => {
    //     this.userId = userId;

    //     console.log(userId);
    //     localStorage.setItem('userId', userId.toString())

    //     this.accountService.addUserAccount(this.userId, this.accountId).subscribe(() => {
    //     });
    //   });

    //   this.router.navigateByUrl('home-page');
    // }
    // else
    //פתיחת חשבון חדש
    this.userService.addUser(this.user).subscribe((userId) => {

      //ככה ממלאים ת ה localStorage
      localStorage.setItem('userId', userId.toString())
      this.presentAlertNewOrJoin();
      // this.router.navigate(['add-account',{"userId":userId,"userName":this.user.UserName}]);
      // this.router.navigate(['add-account', { "userName": this.user.UserName }]);
    });
  }

  async presentAlertNewOrJoin() {
    let alert = this.alertCtrl.create({
      //title: 'Confirm purchase',
      message: 'מה אתה רוצה לעשות?',
      buttons: [
        {
          text: 'פתיחת חשבון חדש',
          //role: 'cancel',
          handler: () => {
            this.router.navigate(['add-account', { "userName": this.user.UserName }])
          }
        },
        {
          text: 'הצטרפות לחשבון קיים',
          handler: () => {
            this.router.navigateByUrl('join')
          }
        }
      ]
    });
    (await alert).present();
  }
}


