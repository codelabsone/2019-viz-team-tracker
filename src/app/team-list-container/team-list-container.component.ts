import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-list-container',
  templateUrl: './team-list-container.component.html',
  styleUrls: ['./team-list-container.component.scss']
})
export class TeamListContainerComponent implements OnInit {
  teams = ["P2P", "Catalog", "Cornerstone", "Data Crispr", "CLO", "SSO", "VizGan", "Tam", "EmtpyTeam"]
  constructor() { }

  ngOnInit() {
  }

}
