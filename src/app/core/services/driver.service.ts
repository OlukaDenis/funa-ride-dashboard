import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Driver } from '@app/modules/drivers/models/driver.model';

@Injectable({
    providedIn: 'root'
})
export class DriverService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getDrivers(page: number, perPage: number, order: string = 'DESC', active?: boolean): Observable<any> {
        let params = new HttpParams()
            .set('page', page.toString())
            .set('perPage', perPage.toString())
            .set('order', order);

        if (active !== undefined) {
            params = params.set('active', active.toString());
        }

        return this.http.get<any>(`${this.apiUrl}/admin/drivers`, { params });
    }

    getDriverById(driverId: number): Observable<Driver> {
        return this.http.get<Driver>(`${this.apiUrl}/drivers/${driverId}`);
    }
}