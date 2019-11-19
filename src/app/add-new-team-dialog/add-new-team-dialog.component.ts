import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TeamService } from '../team.service';

export interface DialogData {
  
}


@Component({
  selector: 'app-add-new-team-dialog',
  templateUrl: './add-new-team-dialog.component.html',
  styleUrls: ['./add-new-team-dialog.component.scss']
})
export class AddNewTeamDialogComponent implements OnInit {
  possibleTeamNames: string[] = [];


  constructor(
    public dialogRef: MatDialogRef<AddNewTeamDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private teamservice: TeamService) {}

    onNoclick(): void {
      this.dialogRef.close();
    }

  ngOnInit() {
  //   this.data.teams.forEach(team => {


  //   });

  // }

}

close() {
  this.dialogRef.close();
}

}
