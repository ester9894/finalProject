import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private listsService: ListsService, private router: Router) { }

  ngOnInit() {
    // this.route.paramMap.subscribe(params => {
    // this.accountId = +params.get("accountId")})

    this.listsService.GetAllTypesList(this.accountId).subscribe((arry) => {
      console.log(arry);
      this.typeListArray = arry;
    });
  }

  editList(typeListId: number) {
    console.log(typeListId);

    this.router.navigate(['show-list', { "typeListId": typeListId }]);

  }

  addTypeList() { }

}