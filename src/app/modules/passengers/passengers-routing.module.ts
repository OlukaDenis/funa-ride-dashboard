import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PassengersComponent } from "./passengers.component";
import { PassengerListComponent } from "./pages/passenger-list/passenger-list.component";

const routes: Routes = [
    {
        path: '',
        component: PassengersComponent,
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: PassengerListComponent },
            { path: '**', redirectTo: 'errors/404' },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PassengerRoutingModule { }