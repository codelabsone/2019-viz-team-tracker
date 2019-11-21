import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Team } from '../models/team.model';
import { TeamService } from '../team.service';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { AddMemberDialogData } from '../interfaces/add-member-dialog-data.interface';
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
  possibleJobTitles: string[] = ['Quality Engineer', 'Software Engineer', 'UX Engineer'];
  team: Team;
  images: Picture[] = [];
  firstImage: number = 0;
  lastImage: number = 5;
  selectedImage: Picture;
  selectedTeam: Team;

  memberForm = new FormGroup({
    pathToPhoto: new FormControl(''),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    team: new FormControl('', [Validators.required])
  });


  constructor(
    public dialogRef: MatDialogRef<AddNewMemberDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddMemberDialogData,
    private teamservice: TeamService,
    private picsumService: PicsumService 
    ) { }

  ngOnInit() {
    this.data.allTeams = this.data.allTeams.filter(data => data.id !== this.data.team.id);
    this.data.allTeams.forEach(team => {
      team.members.forEach(member => {
        if (!this.possibleJobTitles.includes(member.jobtitle)) {
          this.possibleJobTitles.push(member.jobtitle)
        }
      });
    });

    this.memberForm.get('team').setValue(this.data.team.id);
    console.log(this.data.team.id);
    
    this.teamservice.selectedTeam.subscribe(data => {
      this.selectedTeam = data;
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

  setSelectedPic(image: Picture) {
    this.selectedImage = image;
  }

  addMember(memberForm, photo: Picture) {
    const member = {
      firstName: memberForm.get('firstName').value.trim(),
      lastName: memberForm.get('lastName').value.trim(),
      title: memberForm.get('title').value,
      pathToPhoto: photo.url,
      team: memberForm.get('teamName').value
    };

    if (memberForm.get('firstName').value.trim() !== '' && memberForm.get('lastName').value.trim() !== '') {
      this.teamservice.addMember(member).subscribe(data => {
        this.teamservice.refreshTeams();
        this.close()
      });
    }
    
    if (memberForm.get('firstName').value.trim() == '') {
      this.memberForm.get('firstName').setErrors({required: true});
    }

    if (memberForm.get('lastName').value.trim() == '') {
      this.memberForm.get('lastName').setErrors({required: true});
    }
  }

}
