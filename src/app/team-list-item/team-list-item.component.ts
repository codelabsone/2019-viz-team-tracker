import { Component, OnInit, Input} from '@angular/core';
import { Team } from '../models/team.model';
import { Teammember } from '../models/member.model';
import { MatExpansionPanel } from '@angular/material';
import { TeamService } from '../team.service';
import { AddNewMemberDialogComponent } from '../add-new-member-dialog/add-new-member-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { moveItemInArray, CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-team-list-item',
  templateUrl: './team-list-item.component.html',
  styleUrls: ['./team-list-item.component.scss'],
  viewProviders: [MatExpansionPanel]
})
export class TeamListItemComponent implements OnInit {
  @Input() team: Team;
  constructor(private teamService: TeamService, public addMemberDialog: MatDialog) { }

  ngOnInit() {
    this.teamService.selectedTeam.subscribe(data =>{
      this.selectedTeam = data;
    })
  }

  openAddPersonDialog(): void {
    const dialogRef = this.addMemberDialog.open(AddNewMemberDialogComponent, {
      data: {team: this.team}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
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
        }
        else {
          this.startErrorTimer(team);
        }
    }

  }

  startErrorTimer(team: Team) {
    team.limitReachedError = true;
    setTimeout(function(){team.limitReachedError = false}, 3000);
  }
}
