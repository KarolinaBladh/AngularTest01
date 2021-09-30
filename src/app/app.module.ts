import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { AddMeetingDialog, NewPageComponent } from './new-page/new-page.component';
import { HeaderComponent } from './header/header.component';
import { MeetingService } from './services/meeting.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewPageComponent,
    HeaderComponent,
    AddMeetingDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule, 
    MatDialogModule,
    FormsModule, 
    BrowserAnimationsModule
  ],
  providers: [
    MeetingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
