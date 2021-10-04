import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  active = 1;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  ngAfterContentChecked(): void {
    if(this.router.url === "/home"){
      this.active = 1;
    } else if(this.router.url === "/list"){
      this.active = 2;
    } else if(this.router.url === "/week"){
      this.active = 3;
    } else {
      this.active = 1;
    }
  }

}
