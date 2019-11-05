import { Component, OnInit } from '@angular/core';
import { Team } from '../models/team.model';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-team-list-container',
  templateUrl: './team-list-container.component.html',
  styleUrls: ['./team-list-container.component.scss']
})
export class TeamListContainerComponent implements OnInit {
  teams: Team[] = [];


  constructor(private teamService: TeamService) { }

  ngOnInit() {
    this.teams = this.teamService.teams;
  }

}
