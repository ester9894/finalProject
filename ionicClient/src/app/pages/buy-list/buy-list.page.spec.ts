import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BuyListPage } from './buy-list.page';

describe('BuyListPage', () => {
  let component: BuyListPage;
  let fixture: ComponentFixture<BuyListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BuyListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
