import {Component, OnInit} from '@angular/core';
import {EventService} from "../../../core/services/event.service";
import {RouterLink, RouterModule} from "@angular/router";
import {DatePipe, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import { HttpClientModule } from '@angular/common/http';
import {EventClass} from "../../../core/models/event-class";
import {FooterComponent} from "../dashboard/footer/footer.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    DatePipe,
    HttpClientModule, RouterModule, NgForOf, NgIf, FooterComponent, NgOptimizedImage
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


}
