import { Component } from '@angular/core';
import {EventService} from "../../../core/services/event.service";
import {EventClass} from "../../../core/models/event-class";
import {CurrencyPipe, DatePipe, NgForOf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgForOf,
    DatePipe,
    CurrencyPipe
  ],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss'
})
export class EventListComponent {
  events: EventClass[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe((data) => {
      this.events = data;
    });
  }
}
