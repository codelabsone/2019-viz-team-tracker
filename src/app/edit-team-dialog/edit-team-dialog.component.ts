import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditTeamDialogData } from '../interfaces/edit-team-dialog-data.interface';
import { TeamService } from '../team.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-team-dialog',
  templateUrl: './edit-team-dialog.component.html',
  styleUrls: ['./edit-team-dialog.component.scss']
})
export class EditTeamDialogComponent implements OnInit {

  name: string;
  description: string;

  teamForm = new FormGroup({
    name: new FormControl('',
    [Validators.required//,
    /*Validators.pattern('.*\S+.*')*/]),
    description: new FormControl('')
  });



  constructor(
    public dialogRef: MatDialogRef<EditTeamDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditTeamDialogData,
    private teamService: TeamService
  ) { }

  ngOnInit() {
    this.name = this.data.team.name;
    this.description = this.data.team.description;

    this.teamForm.get('name').setValue(this.name);
    this.teamForm.get('description').setValue(this.description);
  }

  onNoclick(): void {
    this.dialogRef.close();
  }

  close(): void {
    this.dialogRef.close();
  }

  update(): void {
    const team = {
      id: this.data.team.id,
      name: this.teamForm.get('name').value,
      description: this.teamForm.get('description').value
    };

    if (this.teamForm.get('name').value.trim() !== '') {
      this.teamService.updateTeam(team).subscribe(data => {
        console.log(data);
        this.close()});
    } else {
      this.teamForm.get('name').setValue('');
      this.teamForm.get('name').setErrors({required: true});
    }
  }
}
