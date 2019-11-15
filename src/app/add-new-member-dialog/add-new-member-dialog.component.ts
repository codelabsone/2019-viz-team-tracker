import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {

  name: string;
  jobtitle: string;
  email: string;
  avatar: string;
}

@Component({
  selector: 'app-add-new-member-dialog',
  templateUrl: './add-new-member-dialog.component.html',
  styleUrls: ['./add-new-member-dialog.component.scss']
})
export class AddNewMemberDialogComponent implements OnInit {
  possibleJobTitles: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddNewMemberDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoclick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.data.teams.forEach(team => {
      team.members.forEach(member => {
        if (!this.possibleJobTitles.includes(member.jobtitle)) {
          this.possibleJobTitles.push(member.jobtitle)
        }
      });
    });
    console.log(this.possibleJobTitles);
  }

  close() {
    this.dialogRef.close();
  }

}
