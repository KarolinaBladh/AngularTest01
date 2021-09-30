import { Injectable } from '@angular/core';
import { Meeting } from '../models/meeting.model';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  meetings: Meeting[] = [];

  constructor() {
    this.addMeetings();
   }

  addMeetings(){
    this.meetings.push({
      dateTime: new Date(2021, 11, 28, 10, 20),
      subject: "födelsedag",
      participants: [{name: "Karolina Bladh", email: "karolina.bladh@cgi.com"}],
      notes: "ta med present"
    },
    {
      dateTime: new Date(2021, 11, 24, 15),
      subject: "julafton",
      participants: [{name: "Karolina Bladh", email: "karolina.bladh@cgi.com"}],
      notes: "ta med julklapp"
    });
  }
}