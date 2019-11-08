import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewMemberDialogComponent } from './add-new-member-dialog.component';

describe('AddNewMemberDialogComponent', () => {
  let component: AddNewMemberDialogComponent;
  let fixture: ComponentFixture<AddNewMemberDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewMemberDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewMemberDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
