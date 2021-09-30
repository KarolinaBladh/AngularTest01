import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbDateStruct, NgbCalendar, NgbDate, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Meeting } from '../models/meeting.model';
import { MeetingService } from '../services/meeting.service';

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
  newMeeting!: Meeting;
  participant = { name: "", email: "" };
  date: { year: number; month: number; day: number; } | undefined;
  time: NgbTimeStruct = {hour: 0, minute: 0, second: 0};
  hourStep = 1;
  minuteStep = 15;
  closeResult = '';

  constructor(private calendar: NgbCalendar, private meetingService: MeetingService, private modalService: NgbModal) {
    this.refreshMeetings();
  }

  ngOnInit(): void {
  }

  refreshMeetings() {
    this.meetings = this.meetingService.meetings
      .map((meeting, i) => ({ id: i + 1, ...meeting }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  open(content: any) {
    this.newMeeting = this.meetingService.createNewMeeting();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.setTime();
      this.meetingService.addNewMeeting(this.newMeeting);
      this.refreshMeetings();
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  addParticipant() {
    this.newMeeting.participants.push(
      this.participant
    );
    this.participant = { name: "", email: "" };
  }

  onDateSelect(date: NgbDate) {
    if (date) {
      this.newMeeting.dateTime.setFullYear(date.year);
      this.newMeeting.dateTime.setMonth(date.month - 1);
      this.newMeeting.dateTime.setDate(date.day);
    }
  }

  private setTime() {
    if (this.time) {
      this.newMeeting.dateTime.setHours(this.time.hour);
      this.newMeeting.dateTime.setMinutes(this.time.minute);
      this.newMeeting.dateTime.setSeconds(0);
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}