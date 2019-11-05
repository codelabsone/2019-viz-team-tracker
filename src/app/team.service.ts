import { Injectable } from '@angular/core';
import { Team } from './models/team.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { MOCKTEAMS } from '../assets/mockteams';


@Injectable({
  providedIn: 'root'
})
export class TeamService {
  
  teams: Team[] = MOCKTEAMS;
  selectedTeam: BehaviorSubject<Team> = new BehaviorSubject<Team>(null);

  constructor() { }

  


}
