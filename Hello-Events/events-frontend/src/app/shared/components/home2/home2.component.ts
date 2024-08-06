import {Component, OnInit} from '@angular/core';
import {EventService} from "../../../core/services/event.service";
import {RouterLink, RouterModule} from "@angular/router";
import {DatePipe, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import { HttpClientModule } from '@angular/common/http';
import {EventClass} from "../../../core/models/event-class";

@Component({
  selector: 'app-home2',
  standalone: true,
  imports: [
    RouterLink,
    DatePipe,
    HttpClientModule, RouterModule, NgForOf, NgIf, NgOptimizedImage
  ],

  templateUrl: './home2.component.html',
  styleUrl: './home2.component.scss'
})
export class Home2Component implements OnInit {
  events: EventClass[] = [];

  constructor(private eventService: EventService) {}
  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe(events => {
      this.events = events;
    });
  }


}
