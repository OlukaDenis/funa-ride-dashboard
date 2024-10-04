import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { LayoutRoutingModule } from './layout-routing.module';
import { HttpRequestInterceptor } from '@app/core/interceptor/http-request.inteceptor';
import { DatePipe } from '@angular/common';
@NgModule({
    imports: [
        LayoutRoutingModule,
        AngularSvgIconModule.forRoot(),
        // HttpClientModule
    ],
    providers: [
        DatePipe,
        // provideHttpClient(withFetch()),
        // { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true }
    ]
})
export class LayoutModule { }
