import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TypesListPage } from './types-list.page';

describe('TypesListPage', () => {
  let component: TypesListPage;
  let fixture: ComponentFixture<TypesListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypesListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TypesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
