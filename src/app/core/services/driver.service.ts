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

    getDrivers(page: number, perPage: number, order: string = 'DESC', active?: boolean, failed?: boolean): Observable<any> {
        let params = new HttpParams()
            .set('page', page.toString())
            .set('perPage', perPage.toString())
            .set('order', order);

        if (active !== undefined) {
            params = params.set('active', active.toString());
        }

        if (failed) {
            params = params.set('failed', failed.toString());
        }

        return this.http.get<any>(`${this.apiUrl}/admin/drivers`, { params });
    }

    getIncompleteDrivers(page?: number, perPage?: number, order: string = 'DESC', active?: boolean, failed: boolean = false): Observable<any> {
        let params = new HttpParams()
            .set('page', page?.toString() || '1')
            .set('perPage', perPage?.toString() || '10')
            .set('order', order);

        if (active !== undefined) {
            params = params.set('active', active.toString());
        }
        params = params.set('pending', 'true');

        return this.http.get<any>(`${this.apiUrl}/admin/drivers`, { params });
    }

    getFailedDrivers(page?: number, perPage?: number, order: string = 'DESC', active?: boolean, failed: boolean = false): Observable<any> {
        let params = new HttpParams()
            .set('page', page?.toString() || '1')
            .set('perPage', perPage?.toString() || '10')
            .set('order', order);

        if (active !== undefined) {
            params = params.set('active', active.toString());
        }
        params = params.set('failed', 'true');

        return this.http.get<any>(`${this.apiUrl}/admin/drivers`, { params });
    }

    getDriversWithDebts(page: number, perPage: number, order: string = 'DESC', active?: boolean): Observable<any> {
        let params = new HttpParams()
            .set('page', page.toString())
            .set('perPage', perPage.toString())
            .set('order', order);

        return this.http.get<any>(`${this.apiUrl}/drivers/debts`);
    }

    getDriverById(driverId: number): Observable<Driver> {
        return this.http.get<Driver>(`${this.apiUrl}/drivers/${driverId}`);
    }

    updatedFailedDriverStatus(driverId: number, email: string, comment: string, status: boolean): Observable<any> {
        console.log(driverId, email, comment, status);
        let params = new HttpParams()
            .set('documentId', driverId.toString())
            .set('failedSignUp', true)
            .set('email', email)
            .set('status', status.toString())
            .set('comment', comment);

        return this.http.post<any>(`${this.apiUrl}/admin/drivers/status`, params);
    }
}
