import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: LayoutComponent,
    loadChildren: () => import('../dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'drivers',
    component: LayoutComponent,
    loadChildren: () => import('../drivers/drivers.module').then((m) => m.DriversModule),
  },
  {
    path: 'trips',
    component: LayoutComponent,
    loadChildren: () => import('../trips/trips.module').then((m) => m.TripsModule),
  },
  {
    path: 'passengers',
    component: LayoutComponent,
    loadChildren: () => import('../passengers/passengers.module').then((m) => m.PassengersModule),
  },
  {
    path: 'components',
    component: LayoutComponent,
    loadChildren: () => import('../uikit/uikit.module').then((m) => m.UikitModule),
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'error/404' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule { }
