import { Component } from '@angular/core';
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {BreadcrumbComponent} from "./breadcrumb/breadcrumb.component";
import {SideBarComponent} from "./side-bar/side-bar.component";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {EventFormComponent} from "../../../features/components/event-form/event-form.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    BreadcrumbComponent,
    SideBarComponent,
    NgOptimizedImage,
    EventFormComponent,
    NgIf
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  showEventForm: boolean = false;
  showBreadcrumb: boolean = true;

  toggleView() {
    this.showEventForm = !this.showEventForm;
    this.showBreadcrumb = !this.showEventForm;
  }

  displayBreadcrumb() {
    this.showEventForm = false;
    this.showBreadcrumb = true;
  }

  displayEventForm() {
    this.showEventForm = true;
    this.showBreadcrumb = false;
  }

  handleMenuItemClick(menuItem: string) {
    if (menuItem === 'Dashboard') {
      this.displayBreadcrumb();
    } else if (menuItem === 'CreateEvent') {
      this.displayEventForm();
    }
  }

}
