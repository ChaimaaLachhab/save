import {Component, EventEmitter, Output} from '@angular/core';
import {NgClass, NgForOf} from "@angular/common";

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    NgForOf,
    NgClass
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  activeItem: string | null = null;

  @Output() menuItemClicked = new EventEmitter<string>();

  activateLink(menuItem: string) {
    this.activeItem = menuItem;
    this.menuItemClicked.emit(menuItem);
  }
}
