import { Component } from '@angular/core';
import {EventService} from "../../../../../core/services/event.service";
import {EventClass} from "../../../../../core/models/event-class";
import {CurrencyPipe, DatePipe, NgForOf} from "@angular/common";
import {LocationComponent} from "../location/location.component";
import {EventListAdminComponent} from "../../../../../features/components/event-list-admin/event-list-admin.component";

@Component({
  selector: 'app-event-history',
  standalone: true,
  imports: [
    NgForOf,
    CurrencyPipe,
    DatePipe,
    LocationComponent,
    EventListAdminComponent
  ],
  templateUrl: './event-history.component.html',
  styleUrl: './event-history.component.scss'
})
export class EventHistoryComponent {

}
