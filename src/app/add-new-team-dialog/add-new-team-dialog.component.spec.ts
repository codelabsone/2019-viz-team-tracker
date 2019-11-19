import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewTeamDialogComponent } from './add-new-team-dialog.component';

describe('AddNewTeamDialogComponent', () => {
  let component: AddNewTeamDialogComponent;
  let fixture: ComponentFixture<AddNewTeamDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewTeamDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewTeamDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
