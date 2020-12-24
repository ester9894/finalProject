import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { List } from 'src/app/shared/models/list.model';
import { ListsService } from 'src/app/shared/services/lists.service';

@Component({
  selector: 'app-buy-list',
  templateUrl: './buy-list.page.html',
  styleUrls: ['./buy-list.page.scss'],
})
export class BuyListPage implements OnInit {


  typeListId: number;
  endDate: Date;
  typeListName: string;
  list: List;
  constructor(private listsService: ListsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.endDate = JSON.parse(params.get('endDate'))
      this.typeListId = +params.get("typeListId")
      this.typeListName = params.get("typeListName")
      console.log(this.typeListName);
      this.addList();
    });
  }


  addList() {
    this.list.EndDate = this.endDate;
    this.list.TypeListId = this.typeListId;
    this.listsService.aadList(this.list);
  }
}
