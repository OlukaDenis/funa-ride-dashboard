import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginationComponentComponent } from './components/pagination-component/pagination-component.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { LoadingComponent } from './components/loading/loading.component';
import { EmptyListComponentComponent } from './components/empty-list-component/empty-list-component.component';
import { ButtonComponent } from './components/button/button.component';

@NgModule({
    declarations: [
        PaginationComponentComponent,
        LoadingComponent,
        EmptyListComponentComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        AngularSvgIconModule,
        ButtonComponent
    ],
    exports: [
        PaginationComponentComponent,
        EmptyListComponentComponent,
        LoadingComponent,
        CommonModule,
        FormsModule,
        AngularSvgIconModule,
        ButtonComponent
    ],
    providers: [

    ]
})
export class SharedModule { }

