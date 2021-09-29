import { Component, OnInit } from '@angular/core';

interface Meeting {
  id?: number;
  date: {year: number, month: number, day: number};
  time: {hour: number, minute: number};
  subject: string;
  participants: {name: string, email: string}[];
  notes: string;
}

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.scss']
})
export class NewPageComponent implements OnInit {
  page = 1;
  pageSize = 8;
  originalMeetings: Meeting[] = [];
  collectionSize = this.originalMeetings.length;
  meetings: Meeting[] = [];

  constructor() { 
    this.addMeetings();
    this.refreshMeetings();
  }

  ngOnInit(): void {
  }

  addMeetings(){
    this.originalMeetings.push({
      date: {year: 2021, month: 12, day:28},
      time: {hour:10, minute: 20},
      subject: "födelsedag",
      participants: [{name: "Karolina Bladh", email: "karolina.bladh@cgi.com"}],
      notes: "ta med present"
    },
    {
      date: {year: 2021, month: 12, day:24},
      time: {hour:15, minute: 0},
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
