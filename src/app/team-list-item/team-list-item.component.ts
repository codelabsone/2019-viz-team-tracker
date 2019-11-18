import { Component, OnInit, Input, Output} from '@angular/core';
import { Team } from '../models/team.model';
import { Teammember } from '../models/member.model';
import { MatExpansionPanel, throwToolbarMixedModesError } from '@angular/material';
import { TeamService } from '../team.service';
import { AddNewMemberDialogComponent } from '../add-new-member-dialog/add-new-member-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { moveItemInArray, CdkDragDrop, CdkDragStart, CdkDragRelease, transferArrayItem, CdkDrag} from '@angular/cdk/drag-drop';
import { DraggingService } from '../dragging.service';

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

  constructor(private teamService: TeamService, public addMemberDialog: MatDialog, private draggingService: DraggingService) { }

  ngOnInit() { 
    this.draggingService.dragging.subscribe(data => {
      this.isDragging = data;
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

  dragStart() {
    console.log("dragStarted");
    this.draggingService.dragging.next(true);
    this.fromThisTeam = true;
  }

  dragStop() {
    console.log("dragReleased");
    this.draggingService.dragging.next(false);
    this.fromThisTeam = false;
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  tryExpand() {
    console.log("tryExpand");
    console.log(this.isDragging);
    if (this.isDragging && !this.isExpanded) {
      this.toggleExpand();
    }
  }

  tryClose() {
    console.log("tryClose");
    if (this.isDragging && this.isExpanded && !this.fromThisTeam) {
      this.toggleExpand();
    }
  }
}
