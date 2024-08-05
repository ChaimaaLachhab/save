import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import {HomeComponent} from "./shared/components/home/home.component";

import {FooterComponent} from "./shared/components/dashboard/footer/footer.component";
import {HeaderComponent} from "./shared/components/dashboard/header/header.component";
import {SideBarComponent} from "./shared/components/dashboard/side-bar/side-bar.component";
import {DashboardComponent} from "./shared/components/dashboard/dashboard.component";
import {LoginComponent} from "./features/components/login/login.component";
import {RegistrationComponent} from "./features/components/sign/sign.component";


@Component({
  selector: 'app-root',
  standalone: true,

  imports: [RouterOutlet, FooterComponent, HeaderComponent, SideBarComponent, DashboardComponent, LoginComponent, RegistrationComponent, HomeComponent],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'events-frontend';
}
