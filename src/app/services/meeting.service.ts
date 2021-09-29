import { Injectable } from '@angular/core';
import { Meeting } from '../models/meeting.model';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  page = 1;
  pageSize = 8;
  originalMeetings: Meeting[] = [];
  collectionSize = this.originalMeetings.length;
  meetings: Meeting[] = [];

  constructor() { }

  addMeetings(){
    this.originalMeetings.push({
      dateTime: {year: 2021, month: 12, day:28, hour:10, minute: 20},
      subject: "födelsedag",
      participants: [{name: "Karolina Bladh", email: "karolina.bladh@cgi.com"}],
      notes: "ta med present"
    },
    {
      dateTime: {year: 2021, month: 12, day:24, hour:15, minute: 0},
      subject: "julafton",
      participants: [{name: "Karolina Bladh", email: "karolina.bladh@cgi.com"}],
      notes: "ta med julklapp"
    });
  }

  refreshMeetings() {
    this.meetings = this.originalMeetings
      .map((meeting, i) => ({id: i + 1, ...meeting}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
}