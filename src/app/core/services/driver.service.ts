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
        const params: any = {
            'page': page?.toString() || '1',
            'perPage': perPage?.toString() || '10',
            'order': order
        }

        if (active !== undefined) {
            params['active'] = active;
        }

        if (failed) {
            params['failed'] = failed;
        }

        return this.http.get<any>(`${this.apiUrl}/admin/drivers`, { params });
    }

    getIncompleteDrivers(page?: number, perPage?: number, order: string = 'DESC', active?: boolean, failed: boolean = false): Observable<any> {
        const params: any = {
            'page': page?.toString() || '1',
            'perPage': perPage?.toString() || '10',
            'order': order,
            'pending': true
        }

        if (active !== undefined) {
            params['active'] = active;
        }

        return this.http.get<any>(`${this.apiUrl}/admin/drivers`, { params });
    }

    getFailedDrivers(page?: number, perPage?: number, order: string = 'DESC', active?: boolean, failed: boolean = false): Observable<any> {
        const params: any = {
            'page': page?.toString() || '1',
            'perPage': perPage?.toString() || '10',
            'order': order,
            'failed': true
        }

        if (active !== undefined) {
            params['active'] = active
        }

        return this.http.get<any>(`${this.apiUrl}/admin/drivers`, { params });
    }

    getDriversWithDebts(page: number, perPage: number, order: string = 'DESC', active?: boolean): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/drivers/debts`);
    }

    getDriverById(driverId: number): Observable<Driver> {
        return this.http.get<Driver>(`${this.apiUrl}/drivers/${driverId}`);
    }

    completeDriverSignup(driverId: number, email: string, comment: string, status: boolean): Observable<any> {
        return this.updateDriverStatus(driverId, email, comment, status.toString(), true);
    }

    rejectDriver(driverId: number, email: string, comment: string, status: string): Observable<any> {
        return this.updateDriverStatus(driverId, email, comment, 'rejected', false);
    }

    private updateDriverStatus(driverId: number, email: string, comment: string, status: string, failedSignUp: boolean): Observable<any> {
        // const payload: any = {
        //     'documentId': driverId.toString(),
        //     'failedSignUp': failedSignUp,
        //     'email': email,
        //     'status': status,
        //     'comment': comment
        // }

        let payload = new HttpParams()
            .set('documentId', driverId.toString())
            .set('failedSignUp', failedSignUp)
            .set('email', email)
            .set('status', status.toString())
            .set('comment', comment);

        return this.http.post<any>(`${this.apiUrl}/admin/drivers/status`, payload);
    }

    resetDriverPassword(email: string, phone: string, firstName: string): Observable<any> {
        let payload = new HttpParams()
            .set('phoneNumber', phone)
            .set('firstName', firstName)
            .set('email', email);

        return this.http.post<any>(`${this.apiUrl}/admin/drivers/reset`, payload);
    }

}
