import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
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
  constructor(private userService: UsersService, private router: Router) { }

  ngOnInit() {

  }
  register() {
    this.userService.addUser(this.user).subscribe((res) => {
      this.router.navigateByUrl('home-page');
    });
  }
}
