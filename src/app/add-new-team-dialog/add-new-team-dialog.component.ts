import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TeamService } from '../team.service';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

export interface DialogData {
  
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-add-new-team-dialog',
  templateUrl: './add-new-team-dialog.component.html',
  styleUrls: ['./add-new-team-dialog.component.scss']
})
export class AddNewTeamDialogComponent {
  possibleTeamNames: string[] = [];
  teamError: boolean = false;

  matcher = new MyErrorStateMatcher;

  teamForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('')
  });


  constructor(
    public dialogRef: MatDialogRef<AddNewTeamDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private teamservice: TeamService) {}

    onNoclick(): void {
      this.dialogRef.close();
    }

  close() {
    this.dialogRef.close();
  }

  addTeam(teamForm) {
    const team = {
      name: teamForm.get('name').value,
      description:teamForm.get('description').value
    }

    if (team.name.length < 1) {
      this.teamError = true;
    } else {
      this.teamservice.addTeam(team).subscribe(data => {
        console.log(data);
      this.close()});
    }

  }
}
