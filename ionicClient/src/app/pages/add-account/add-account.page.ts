import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from '@angular/core';

import { AccountsService } from 'src/app/shared/services/accounts.service';
import { Account } from 'src/app/shared/models/account.model';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.page.html',
  styleUrls: ['./add-account.page.scss'],
})
export class AddAccountPage implements OnInit {
  account: Account = new Account();

  constructor(private accountService: AccountsService, private router: Router, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => { this.account.ManagerId = +params.get("userId") })

  }

  ngOnInit() {
  }

  addAccount() {
    console.log(this.account);

    this.accountService.addAccount(this.account).subscribe((accountId) => {
      if (accountId != 0)
        this.accountService.addUserAccount(this.account.ManagerId, accountId).subscribe((res) => {
          this.router.navigateByUrl('products');

        });
      else
        alert("שם משתמש וסיסמא קיימים");
    })

  }
}
