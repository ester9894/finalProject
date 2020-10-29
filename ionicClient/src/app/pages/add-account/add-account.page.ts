import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from '@angular/core';

import { AccountsService } from 'src/app/shared/services/accounts.service';
import { Account } from 'src/app/shared/models/account.model';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.page.html',
  styleUrls: ['./add-account.page.scss'],
})
export class AddAccountPage implements OnInit {
  account: Account = new Account();
  userName: string;


  constructor(private accountService: AccountsService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.account.ManagerId = +localStorage.getItem('userId')
      this.userName = params.get("userName")


      console.log(this.userName);
      console.log("localStorage " + this.account.ManagerId);

    })
  }

  addAccount() {
    console.log(this.account);

    this.accountService.addAccount(this.account).subscribe((accountId) => {
      localStorage.setItem('accountId', accountId.toString())

      if (accountId != 0)
        this.accountService.addUserAccount(this.account.ManagerId, accountId).subscribe((res) => {
          this.router.navigate(['products']);

        });
      else
        alert("שם חשבון זה קיים במערכת, נא הקש שם חדש");
    })

  }
}
