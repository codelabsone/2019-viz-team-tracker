import { Component, OnInit } from '@angular/core';
import { Team } from '../models/team.model';
import { Teammember } from '../models/member.model';
import { TeamService } from '../team.service';


@Component({
  selector: 'app-info-container',
  templateUrl: './info-container.component.html',
  styleUrls: ['./info-container.component.scss']
})
export class InfoContainerComponent implements OnInit {

team: Team;
selectedMember: Teammember = null;

  constructor(private teamservice: TeamService) { 

  }

  ngOnInit() {
    this.teamservice.selectedTeam.subscribe(data => {
        this.team = data;
      })
    }

  onClickMe(member: Teammember) {
    this.selectedMember = member;
  }

  returnClick() {
    this.selectedMember = null;
  }
}
