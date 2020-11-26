import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Local } from 'protractor/built/driverProviders';
import { TypeList } from 'src/app/shared/models/type_list.model';
import { ListsService } from 'src/app/shared/services/lists.service';

@Component({
  selector: 'app-types-list',
  templateUrl: './types-list.page.html',
  styleUrls: ['./types-list.page.scss'],
})
export class TypesListPage implements OnInit {
  accountId: number;
  typeListArray: Array<TypeList>;

  constructor(private listsService: ListsService, private router: Router) { }

  ngOnInit() {
    // this.route.paramMap.subscribe(params => {
    // this.accountId = +params.get("accountId")})

    this.listsService.GetAllTypesList(+localStorage.getItem('accountId')).subscribe((arry) => {
      console.log(arry);
      this.typeListArray = arry;
    });
  }

  editList(typeListId: number, typeListName:string) {
    console.log(typeListId);
    console.log(typeListName);

    this.router.navigate(['show-list', { "typeListId": typeListId , "typeListName":typeListName}]);

  }

  addTypeList() {
    this.router.navigateByUrl('create-list')

   }
 
}
