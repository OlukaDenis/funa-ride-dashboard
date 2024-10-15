import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DriversComponent } from "./drivers.component";
import { DriverListComponent } from "./pages/driver-list/driver-list.component";
import { IncompleteDriverListComponent } from "./pages/incomplete-driver-list/incomplete-driver-list.component";
import { DriverDetailComponent } from "./pages/driver-detail/driver-detail.component";
import { DriversWithDebtsComponent } from "./pages/drivers-with-debts/drivers-with-debts.component";

const routes: Routes = [
    {
        path: '',
        component: DriversComponent,
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: DriverListComponent },
            { path: 'incomplete', component: IncompleteDriverListComponent },
            { path: 'with-debts', component: DriversWithDebtsComponent },
            { path: ':id', component: DriverDetailComponent },
            { path: '**', redirectTo: 'errors/404' },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DriversRoutingModule { }