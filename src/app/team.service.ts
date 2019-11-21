import { Injectable, OnInit } from '@angular/core';
import { Team } from './models/team.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TeamFromApi } from './models/teamFromApi.model';



@Injectable({
  providedIn: 'root'
})
export class TeamService {
  
  selectedTeam: BehaviorSubject<Team> = new BehaviorSubject<Team>(null);
  teamsList: BehaviorSubject<Team[]> = new BehaviorSubject<Team[]>([]);
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  
  constructor(private http: HttpClient) {
   
   }
   
  refreshTeams()  {
    this.getAllTeams().subscribe(data => {
      this.isLoading.next(false);
      const teams: Team[] = []
      data.forEach(team => {
        teams.push(new Team(team));
      });
      this.teamsList.next(teams);
    })
  } 
  
  getAllTeams(): Observable<TeamFromApi[]> {
    return this.http.get<TeamFromApi[]>('https://viz-teams-back.herokuapp.com/team');
  }

  addTeam(team: any) {
    return this.http.post('https://viz-teams-back.herokuapp.com/team', team);
  }

  deleteTeam(team: Team) {
    return this.http.delete("https://viz-teams-back.herokuapp.com/team/" + team.id, {responseType: 'text'});
  }

  addMember(member: any) {
    return this.http.post('https://viz-teams-back.herokuapp.com/member', member);
  }

  deleteMember(member: any) {
    return this.http.delete('https://viz-teams-back.herokuapp.com/member/' + member.id, {responseType: 'text'});
  }

  updateTeam(team: any) {
    return this.http.put('https://viz-teams-back.herokuapp.com/team', team);
  }

}
