import { Component, OnInit, Input, Output } from '@angular/core';
import { Team } from '../models/team.model';
import { Teammember } from '../models/member.model';
import { MatExpansionPanel, throwToolbarMixedModesError } from '@angular/material';
import { TeamService } from '../team.service';
import { AddNewMemberDialogComponent } from '../add-new-member-dialog/add-new-member-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { moveItemInArray, CdkDragDrop, CdkDragStart, CdkDragRelease, transferArrayItem, CdkDrag } from '@angular/cdk/drag-drop';
import { DraggingService } from '../dragging.service';
import { TeamFromApi } from '../models/teamFromApi.model';
import { MemberFromApi } from '../models/memberFromApi.model';

@Component({
  selector: 'app-team-list-item',
  templateUrl: './team-list-item.component.html',
  styleUrls: ['./team-list-item.component.scss'],
  viewProviders: [MatExpansionPanel]
})
export class TeamListItemComponent implements OnInit {
  @Input() team: Team;
  isDragging: boolean = false;
  isExpanded: boolean = false;
  fromThisTeam: boolean;

  allTeams: Team[] = [];

  constructor(private teamService: TeamService, public addMemberDialog: MatDialog, private draggingService: DraggingService) { }

  ngOnInit() {
    this.draggingService.dragging.subscribe(data => {
      this.isDragging = data;
    })
    this.teamService.getAllTeams().subscribe((teamsFromApi: TeamFromApi[]) => {
      teamsFromApi.forEach(team => {
        this.allTeams.push(new Team(team));
      })
    })

  }

  openAddPersonDialog(): void {
    const dialogRef = this.addMemberDialog.open(AddNewMemberDialogComponent, {
      data: { team: this.team, allTeams: this.allTeams, method: 'add',
        member: {
          name: '',
          email: '',
          jobtitle: '',
          avatar: '',
          id: null
        } }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  setSelectedTeam(team: Team) {
    this.teamService.selectedTeam.next(team);
  }

  drop(event: CdkDragDrop<Teammember[]>, team: Team) {
    if (event.previousContainer === event.container) {
      moveItemInArray(team.members, event.previousIndex, event.currentIndex);
    } else {
      if (event.container.data.length < 12) {
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
          let member = event.container.data[event.currentIndex];
          member.teamId = event.container.data[(event.currentIndex === 0) ? 1 : 0].teamId;
          const memberApi: MemberFromApi = {
            firstName: member.firstName,
            lastName: member.lastName,
            title: member.jobtitle,
            pathToPhoto: member.avatar,
            teamId: member.teamId,
            id: member.id
          }
          this.teamService.updateMember(memberApi).subscribe(data => console.log(data));
      }
      else {
        this.startErrorTimer(team);
      }
    }

  }

  startErrorTimer(team: Team) {
    team.limitReachedError = true;
    setTimeout(function () { team.limitReachedError = false }, 3000);
  }

  dragStart() {
    this.draggingService.dragging.next(true);
    this.fromThisTeam = true;
  }

  dragStop() {
    this.draggingService.dragging.next(false);
    this.fromThisTeam = false;
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  tryExpand() {
    if (this.isDragging && !this.isExpanded) {
      this.toggleExpand();
    }
  }

  tryClose() {
    if (this.isDragging && this.isExpanded && !this.fromThisTeam) {
      this.toggleExpand();
    }
  }
}
