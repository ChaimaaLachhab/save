import { Component } from '@angular/core';
import {CurrencyPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {EventClass} from "../../../core/models/event-class";
import {EventService} from "../../../core/services/event.service";

@Component({
  selector: 'app-event-list-admin',
  standalone: true,
  imports: [
    CurrencyPipe,
    DatePipe,
    NgForOf,
    NgIf
  ],
  templateUrl: './event-list-admin.component.html',
  styleUrl: './event-list-admin.component.scss'
})
export class EventListAdminComponent {
  events: EventClass[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe((data) => {
      this.events = data;
    });
  }

  deleteEvent(id: number | undefined): void {
    if (id !== undefined) {
      this.eventService.deleteEvent(id).subscribe(() => {
        this.events = this.events.filter(event => event.id !== id);
      });
    } else {
      console.error('Event ID is undefined');
    }
  }

}
