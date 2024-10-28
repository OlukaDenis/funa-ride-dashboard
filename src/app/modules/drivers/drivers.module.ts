import { NgModule } from '@angular/core';
import { DriversRoutingModule } from './drivers-routing.module';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
    imports: [DriversRoutingModule, SharedModule]
})
export class DriversModule { }