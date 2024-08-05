import { Component } from '@angular/core';
import {LocationComponent} from "./location/location.component";
import {EventHistoryComponent} from "./event-history/event-history.component";
import {PurchaseHistoryComponent} from "./purchase-history/purchase-history.component";

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [
    LocationComponent,
    EventHistoryComponent,
    PurchaseHistoryComponent,
  ],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {

}
