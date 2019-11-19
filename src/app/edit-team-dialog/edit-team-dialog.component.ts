import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditTeamDialogData } from '../interfaces/edit-team-dialog-data.interface';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-edit-team-dialog',
  templateUrl: './edit-team-dialog.component.html',
  styleUrls: ['./edit-team-dialog.component.scss']
})
export class EditTeamDialogComponent implements OnInit {

  name: string;
  description: string;

  constructor(
    public dialogRef: MatDialogRef<EditTeamDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditTeamDialogData,
    private teamService: TeamService
  ) { }

  ngOnInit() {
    console.log(this.data);
    this.name = this.data.team.name;
    this.description = this.data.team.description;
  }

  onNoclick(): void {
    this.dialogRef.close();
  }

  close(): void {
    this.dialogRef.close();
  }
}
