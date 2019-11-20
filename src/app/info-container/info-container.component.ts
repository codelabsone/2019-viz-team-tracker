import { Component, OnInit } from '@angular/core';
import { Team } from '../models/team.model';
import { Teammember } from '../models/member.model';
import { TeamService } from '../team.service';
import { MatDialog } from '@angular/material';
import { EditTeamDialogComponent } from '../edit-team-dialog/edit-team-dialog.component';


@Component({
  selector: 'app-info-container',
  templateUrl: './info-container.component.html',
  styleUrls: ['./info-container.component.scss']
})
export class InfoContainerComponent implements OnInit {

team: Team;
selectedMember: Teammember = null;

  constructor(private teamservice: TeamService, public editTeamDialog: MatDialog) { 

  }

  ngOnInit() {
    this.teamservice.selectedTeam.subscribe(data => {
        this.team = data;
      });
    }

  onClickMe(member: Teammember) {
    this.selectedMember = member;
  }

  returnClick() {
    this.selectedMember = null;
  }

  openEditTeamDialog() {
    // console.log("dialog opened!");
    const dialogRef = this.editTeamDialog.open(EditTeamDialogComponent, { data: { team: this.team } });

    dialogRef.afterClosed().subscribe();
  }

  deleteTeamConfirm(team: Team) {
    let response: boolean;
    response = confirm("Are you sure you want to delete " + team.name + "?");
    if (response) {
      console.log("deleting");
      this.teamservice.deleteTeam(team).subscribe(data => {
        this.teamservice.refreshTeams();
      });
    }
    else {
      console.log('declined')
    }
  }
}
