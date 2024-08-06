import {Component, OnInit} from '@angular/core';
import {EventService} from "../../../core/services/event.service";
import {RouterLink, RouterModule} from "@angular/router";
import {CurrencyPipe, DatePipe, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import { HttpClientModule } from '@angular/common/http';
import {EventClass} from "../../../core/models/event-class";
import {FooterComponent} from "../dashboard/footer/footer.component";
import {LoginComponent} from "../../../features/components/login/login.component";
import {RegistrationComponent} from "../../../features/components/sign/sign.component";
import {EventListComponent} from "../../../features/components/event-list/event-list.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    DatePipe,
    HttpClientModule, RouterModule, NgForOf, NgIf, FooterComponent, NgOptimizedImage, LoginComponent, RegistrationComponent, EventListComponent, CurrencyPipe
  ],

  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  events: EventClass[] = [];

  constructor(private eventService: EventService) {}
  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe(events => {
      this.events = events;
    });
  }

  showLogin = false;
  showSignUp = false;

  toggleLogin() {
    this.showLogin = !this.showLogin;
    this.showSignUp = false;
  }

  toggleSignUp() {
    this.showSignUp = !this.showSignUp;
    this.showLogin = false;
  }

  closeForms() {
    this.showLogin = false;
    this.showSignUp = false;
  }



}
