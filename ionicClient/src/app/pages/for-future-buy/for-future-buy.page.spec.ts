import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ForFutureBuyPage } from './for-future-buy.page';

describe('ForFutureBuyPage', () => {
  let component: ForFutureBuyPage;
  let fixture: ComponentFixture<ForFutureBuyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForFutureBuyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ForFutureBuyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
