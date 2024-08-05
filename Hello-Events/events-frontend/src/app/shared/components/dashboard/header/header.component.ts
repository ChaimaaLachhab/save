import {Component, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isOpen = false;
  activeTab: string = 'overview';

  toggleNavigation(): void {
    this.isOpen = !this.isOpen;
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  @Output() createEvent = new EventEmitter<void>();

  onCreateEvent() {
    this.createEvent.emit();
  }
}
