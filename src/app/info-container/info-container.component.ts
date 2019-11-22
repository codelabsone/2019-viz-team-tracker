import { Component, OnInit } from '@angular/core';
import { Team } from '../models/team.model';
import { Teammember } from '../models/member.model';
import { TeamService } from '../team.service';
import { MatDialog } from '@angular/material';
import { EditTeamDialogComponent } from '../edit-team-dialog/edit-team-dialog.component';
import { AddNewMemberDialogComponent } from '../add-new-member-dialog/add-new-member-dialog.component';
import { TeamFromApi } from '../models/teamFromApi.model';


@Component({
  selector: 'app-info-container',
  templateUrl: './info-container.component.html',
  styleUrls: ['./info-container.component.scss']
})
export class InfoContainerComponent implements OnInit {

team: Team;
selectedMember: Teammember = null;
allTeams: Team[] = [];

  constructor(private teamservice: TeamService, public editTeamDialog: MatDialog, public addMemberDialog: MatDialog) { 

  }

  ngOnInit() {
    this.teamservice.selectedTeam.subscribe(data => {
        this.team = data;
        this.selectedMember = null;
      });

    this.teamservice.getAllTeams().subscribe((teamsFromApi: TeamFromApi[]) => {
      teamsFromApi.forEach(team => {
        this.allTeams.push(new Team(team));
      });
    });
    }

  onClickMe(member: Teammember) {
    this.selectedMember = member;
  }

  returnClick() {
    this.selectedMember = null;
  }

  openEditTeamDialog() {
    const dialogRef = this.editTeamDialog.open(EditTeamDialogComponent, { data: { team: this.team } });

    dialogRef.afterClosed().subscribe();
  }

  deleteTeamConfirm(team: Team) {
    let response: boolean;
    response = confirm("Are you sure you want to delete " + team.name + "?");
    if (response) {
      this.teamservice.deleteTeam(team).subscribe(data => {
        this.teamservice.refreshTeams();
      });
    }
    else {
      console.log('declined')
    }
  }

  deleteMember(member: Teammember) {
    let response: boolean;
    response = confirm("Are you sure you want to delete " + member.name + "?");
    if (response) {
      this.team.members = this.team.members.filter(m => { m !== member });
      this.selectedMember = null;
      this.teamservice.deleteMember(member).subscribe(data => {
        this.teamservice.refreshTeams();
      });
    } else {
      console.log('member delete declined');
    }
  }

  openEditMemberDialog(): void {
    const dialogRef = this.addMemberDialog.open(AddNewMemberDialogComponent, {
      data: { team: this.team, allTeams: this.allTeams, method: 'edit', member: this.selectedMember, id: this.selectedMember.id }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
