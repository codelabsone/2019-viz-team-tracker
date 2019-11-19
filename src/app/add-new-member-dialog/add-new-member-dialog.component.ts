import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Team } from '../models/team.model';
import { TeamService } from '../team.service';
import { PicsumService } from '../picsum.service';
import { PicsumPhoto } from '../interfaces/picsum-photo.interface';
import { Picture } from '../models/picture.model';
import { PageEvent, MatPaginator } from '@angular/material';

export interface DialogData {

  name: string;
  jobtitle: string;
  email: string;
  avatar: string;
}

@Component({
  selector: 'app-add-new-member-dialog',
  templateUrl: './add-new-member-dialog.component.html',
  styleUrls: ['./add-new-member-dialog.component.scss']
})
export class AddNewMemberDialogComponent implements OnInit {
  possibleJobTitles: string[] = [];
  team: Team;
  images: Picture[] = [];
  firstImage: number = 0;
  lastImage: number = 5;


  constructor(
    public dialogRef: MatDialogRef<AddNewMemberDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private teamservice: TeamService,
    private picsumService: PicsumService) { }

  onNoclick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.team = this.data.team;
   
      this.team.members.forEach(member => {
        if (!this.possibleJobTitles.includes(member.jobtitle)) {
          this.possibleJobTitles.push(member.jobtitle)
        }
      });
    this.teamservice.selectedTeam.subscribe(data => {
      this.team = data;
    });
    this.picsumService.getImages(1, 100).subscribe((picsumPhotos: PicsumPhoto[]) => {
      picsumPhotos.forEach((photo: PicsumPhoto) => {
        this.images.push(new Picture(photo.id));
      });
    })
  }

  setPagedPhotos(event: PageEvent, matPaginator: MatPaginator) {
    const pageIndex = matPaginator.pageIndex * matPaginator.pageSize;
    this.firstImage = pageIndex;
    this.lastImage = 5 + pageIndex;
  }

  close() {
    this.dialogRef.close();
  }

}
