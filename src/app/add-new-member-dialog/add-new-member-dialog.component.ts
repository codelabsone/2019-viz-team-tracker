import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Team } from '../models/team.model';
import { TeamService } from '../team.service';
import { PicsumService } from '../picsum.service';

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
  team: Team;
  images: any;

  constructor(
    public dialogRef: MatDialogRef<AddNewMemberDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private teamservice: TeamService,
    private picsumService: PicsumService) { }

  onNoclick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.team = this.data.team;
   
      this.team.members.forEach(member => {
        if (!this.possibleJobTitles.includes(member.jobtitle)) {
          this.possibleJobTitles.push(member.jobtitle)
        }
      });
    this.teamservice.selectedTeam.subscribe(data => {
      this.team = data;
    });
    this.picsumService.getImages(1, 100).subscribe(data => {
      console.log(data);
    })
  }

  close() {
    this.dialogRef.close();
  }

}
