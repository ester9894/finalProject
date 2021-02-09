import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { List } from 'src/app/shared/models/list.model';
import { ListsService } from 'src/app/shared/services/lists.service';

@Component({
  selector: 'app-active-buy-list',
  templateUrl: './active-buy-list.page.html',
  styleUrls: ['./active-buy-list.page.scss'],
})
export class ActiveBuyListPage implements OnInit {
  accountId = + localStorage.getItem('accountId')
  activeLists: List[] = []
  constructor(private listService: ListsService, private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(
      e => this.GetAllActiveLists()
    )
    //this.GetAllActiveLists()
  }

  // get Active lists for account
  GetAllActiveLists() {
    this.listService.GetAllActiveLists(this.accountId).subscribe((lists) => {
      if (lists)
        this.activeLists = lists.slice().sort((a, b) => new Date(a.EndDate).valueOf() - new Date(b.EndDate).valueOf())
      else
        this.activeLists = null;

    })
  }

  goToBuyList(list: List) {
    this.router.navigate(['buy-list', { "endDate": list.EndDate, "typeListId": list.TypeListId, "typeListName": list.TypeListName, "listId": list.ListId }]);
  }
}
