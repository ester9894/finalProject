import { Component, OnInit } from '@angular/core';
import { TypeList } from 'src/app/shared/models/type_list.model';
import { ListsService } from 'src/app/shared/services/lists.service';

@Component({
  selector: 'app-types-list',
  templateUrl: './types-list.page.html',
  styleUrls: ['./types-list.page.scss'],
})
export class TypesListPage implements OnInit {
  accountId: number = 2;
  typeListArray: Array<TypeList>;

  constructor(private listsService: ListsService) { }

  ngOnInit() {
    this.listsService.GetAllTypesList(this.accountId).subscribe((arry) => {
      console.log(arry);
      this.typeListArray=arry;
    });
  }

  addTypeList(){}

}
