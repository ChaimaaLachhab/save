import { Routes } from '@angular/router';
import {DashboardComponent} from "./shared/components/dashboard/dashboard.component";
import {HomeComponent} from "./shared/components/home/home.component";
import {Home2Component} from "./shared/components/home2/home2.component";

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'home', component: HomeComponent},
  { path: 'home2', component: Home2Component},
];
