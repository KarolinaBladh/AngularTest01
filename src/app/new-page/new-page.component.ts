import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Meeting } from '../models/meeting.model';
import { MeetingService } from '../services/meeting.service';

export interface MeetingSave {
  value: string;
}

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.scss']
})
export class NewPageComponent implements OnInit {
  page = 1;
  pageSize = 8;
  meetings: Meeting[] = [];
  collectionSize = this.meetings.length;

  constructor(public dialog: MatDialog, 
    private meetingService: MeetingService) {
    this.refreshMeetings();
  }

  ngOnInit(): void {
  }

  refreshMeetings() {
    this.meetings = this.meetingService.meetings
      .map((meeting, i) => ({ id: i + 1, ...meeting }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddMeetingDialog, {
      width: '500px',
      data: { value: "" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let value = result.value;
      }
    });
  }
}

@Component({
  selector: 'add-meeting-dialog',
  templateUrl: 'add-meeting-dialog.html',
})
export class AddMeetingDialog {

  constructor(
    public dialogRef: MatDialogRef<AddMeetingDialog>,
    @Inject(MAT_DIALOG_DATA) public meeting: MeetingSave) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  change(event: any) {
    this.meeting.value = "test";// event.target.files[0];
  }
}