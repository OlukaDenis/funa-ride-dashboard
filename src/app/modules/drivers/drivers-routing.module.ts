import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DriversComponent } from "./drivers.component";
import { DriverListComponent } from "./pages/driver-list/driver-list.component";
import { IncompleteDriverListComponent } from "./pages/incomplete-driver-list/incomplete-driver-list.component";

const routes: Routes = [
    {
        path: '',
        component: DriversComponent,
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: DriverListComponent },
            { path: 'incomplete', component: IncompleteDriverListComponent },
            { path: '**', redirectTo: 'errors/404' },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DriversRoutingModule { }