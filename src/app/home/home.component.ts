import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgbDateStruct, NgbCalendar, NgbDatepicker} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  model: NgbDateStruct;
  date: {year: number, month: number};

  constructor(public router: Router, private calendar: NgbCalendar) {
    this.model = this.calendar.getToday();
    this.date = { year: this.model.year, month: this.model.month}
  }

  selectToday() {
    this.model = this.calendar.getToday();
  }

  ngOnInit(): void {
  }
  
}