import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamListContainerComponent } from './team-list-container.component';

describe('TeamListContainerComponent', () => {
  let component: TeamListContainerComponent;
  let fixture: ComponentFixture<TeamListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamListContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
