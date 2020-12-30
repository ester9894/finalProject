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
accountId =+ localStorage.getItem('accountId')
activeLists : List[]
  constructor(private listService: ListsService, private router: Router) { }

  ngOnInit() 
  {
    this.listService.GetAllActiveLists(this.accountId).subscribe((lists) => 
    {
      this.activeLists = lists
    })
  }

  goToBuyList(list: List)
  {
    this.router.navigate(['buy-list', { "endDate":list.EndDate, "typeListId": list.TypeListId ,"typeListName": list.TypeListName, "listId": list.ListId}]);

  }

}
