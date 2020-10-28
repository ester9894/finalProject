import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AccountsService } from 'src/app/shared/services/accounts.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { User } from 'src/app/shared/models/user.model';
import { Form, FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user: User = new User();
  loginForm: FormGroup;
  accountId: number = 0;
  userId:number

  constructor(private route: ActivatedRoute, private userService: UsersService, private router: Router, private accountService: AccountsService) {
    this.route.paramMap.subscribe(params => { this.accountId = +params.get("accountId") })
  }

  ngOnInit() {

  }
  // לבדוק אם הפונקציה הגיעה עם מספר חשבון-זה רק להוסיף למשתמשים ולמשתמשים לחשבון
  // או שהיא בלי מספר חשבון וזה לפתוח חשבון חדש לגמרי(חשבונות,משתמשים,משתמשים לחשבון)
  register() {
    if (this.accountId != 0) {
      //משתמש נוסף לחשבון
      this.userService.addUser(this.user).subscribe((userId) => {
        this.userId=userId;
        console.log(userId);

        this.accountService.addUserAccount(this.userId,this.accountId).subscribe(()=>{
          console.log("userId: "+this.userId+" accountId: "+this.accountId);
          });
      });
        this.router.navigateByUrl('home-page');
    }
    else
      //פתיחת חשבון חדש
      this.userService.addUser(this.user).subscribe((userId) => {
console.log(this.user.UserName);

        this.router.navigate(['add-account',{"userId":userId,"userName":this.user.UserName}]);
      });
  }
}


