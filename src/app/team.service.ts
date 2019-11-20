import { Injectable } from '@angular/core';
import { Team } from './models/team.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TeamFromApi } from './models/teamFromApi.model';



@Injectable({
  providedIn: 'root'
})
export class TeamService {
  
  selectedTeam: BehaviorSubject<Team> = new BehaviorSubject<Team>(null);

  constructor(private http: HttpClient) { }

  getAllTeams(): Observable<TeamFromApi[]> {
    return this.http.get<TeamFromApi[]>('https://viz-teams-back.herokuapp.com/team');
  }

  addTeam(team: any) {
    return this.http.post('https://viz-teams-back.herokuapp.com/team', team);
  }

}
