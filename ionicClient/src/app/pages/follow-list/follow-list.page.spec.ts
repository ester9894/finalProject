import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FollowListPage } from './follow-list.page';

describe('FollowListPage', () => {
  let component: FollowListPage;
  let fixture: ComponentFixture<FollowListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FollowListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
