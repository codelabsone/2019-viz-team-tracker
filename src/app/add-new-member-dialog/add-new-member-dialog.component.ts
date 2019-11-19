import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Team } from '../models/team.model';
import { TeamService } from '../team.service';
import { FormGroup, FormControl } from '@angular/forms';
import { AddMemberDialogData } from '../interfaces/add-member-dialog-data.interface';
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
  possibleJobTitles: string[] = ['Quality Engineer', 'Software Engineer', 'UX Engineer'];
  team: Team;
  selectedTeam: Team;

  memberForm = new FormGroup({
    pathToPhoto: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    title: new FormControl(''),
    team: new FormControl('')
  });


  constructor(
    public dialogRef: MatDialogRef<AddNewMemberDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddMemberDialogData,
    private teamservice: TeamService,
    private picsumService: PicsumService 
    ) { }

  ngOnInit() {
    this.data.allTeams.forEach(team => {
      team.members.forEach(member => {
        if (!this.possibleJobTitles.includes(member.jobtitle)) {
          this.possibleJobTitles.push(member.jobtitle)
        }
      });
    });
    
    this.teamservice.selectedTeam.subscribe(data => {
      this.selectedTeam = data;
    });
    
    this.picsumService.getImages(1, 100).subscribe(data => {
      console.log(data);
    })
  }

  onNoclick(): void {
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }

}
