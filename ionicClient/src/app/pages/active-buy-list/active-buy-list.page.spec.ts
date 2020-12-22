import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ActiveBuyListPage } from './active-buy-list.page';

describe('ActiveBuyListPage', () => {
  let component: ActiveBuyListPage;
  let fixture: ComponentFixture<ActiveBuyListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveBuyListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ActiveBuyListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
