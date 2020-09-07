import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/services/users.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.page.html',
  styleUrls: ['./add-user.page.scss'],
})
export class AddUserPage implements OnInit {

  constructor(private userService:UsersService) { }

  ngOnInit() {

  }
  addUser(form){
    //this.accountService.login(form.value).subscribe((res)=>{
    //  this.router.navigateByUrl('home');
   // });
  }

}
