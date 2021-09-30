import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
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
  date: NgbDateStruct | undefined;
  time: NgbTimeStruct | undefined;
  hourStep = 1;
  minuteStep = 15;
  closeResult = '';

  constructor(private meetingService: MeetingService, private modalService: NgbModal) {
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
    this.getDateTime();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.setDateTime();
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

  private getDateTime() {
    if(this.newMeeting.dateTime){
      this.date = { year: this.newMeeting.dateTime.getFullYear(),
        month: this.newMeeting.dateTime.getMonth() + 1, day: this.newMeeting.dateTime.getDate()};
      this.time = { hour: this.newMeeting.dateTime.getHours(), minute: this.newMeeting.dateTime.getMinutes(), second: 0};
    }
    
  }

  private setDateTime() {
    this.newMeeting.dateTime.setFullYear(this.date ? this.date.year : 0)
    this.newMeeting.dateTime.setMonth(this.date ? this.date.month - 1 : 0);
    this.newMeeting.dateTime.setDate(this.date ? this.date.day : 0);
    this.newMeeting.dateTime.setHours(this.time ? this.time.hour : 0);
    this.newMeeting.dateTime.setMinutes(this.time ? this.time.minute : 0);
    this.newMeeting.dateTime.setSeconds(0);
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