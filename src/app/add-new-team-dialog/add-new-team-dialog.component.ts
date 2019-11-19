import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TeamService } from '../team.service';
import { FormGroup, FormControl } from '@angular/forms';

export interface DialogData {
  
}


@Component({
  selector: 'app-add-new-team-dialog',
  templateUrl: './add-new-team-dialog.component.html',
  styleUrls: ['./add-new-team-dialog.component.scss']
})
export class AddNewTeamDialogComponent {
  possibleTeamNames: string[] = [];

  teamForm = new FormGroup({
    name: new FormControl(''),
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

    this.teamservice.addTeam(team).subscribe(data => {
      console.log(data);
    this.close()});

  }
}
