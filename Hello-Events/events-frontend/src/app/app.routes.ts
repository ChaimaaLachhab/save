import { Routes } from '@angular/router';
import {DashboardComponent} from "./shared/components/dashboard/dashboard.component";

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent},
  { path: 'home', component: DashboardComponent},
  { path: 'home2', component: DashboardComponent},
];
