import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TripsComponent } from './trips.component';
import { TripListComponent } from './pages/trip-list/trip-list.component';
import { RoutineListComponent } from './pages/routine-list/routine-list.component';
import { HelperService } from '@app/core/services/helper.service';
import { RoutineDetailComponent } from './pages/routine-detail/routine-detail.component';

const routes: Routes = [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: TripListComponent },
    { path: 'routine-list', component: RoutineListComponent },
    { path: 'details', component: RoutineDetailComponent },
    { path: '**', redirectTo: 'list' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [HelperService]
})
export class TripsRoutingModule { }