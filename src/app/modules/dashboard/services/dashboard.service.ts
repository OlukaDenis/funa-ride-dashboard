import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getDashboardTotals(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/admin/totals`);
    }

    getTripsSummary(from: string, to: string, criteria: string): Observable<any> {
        let params = new HttpParams()
            .set('from', from)
            .set('to', to)
            .set('criteria', criteria);

        return this.http.get<any>(`${this.apiUrl}/rides/statistics`, { params });
    }

    getUsersSummary(from: string, to: string, criteria: string): Observable<any> {
        let params = new HttpParams()
            .set('from', from)
            .set('to', to)
            .set('criteria', criteria);

        return this.http.get<any>(`${this.apiUrl}/users/statistics`, { params });
    }

    getDriversSummary(from: string, to: string, criteria: string): Observable<any> {
        let params = new HttpParams()
            .set('from', from)
            .set('to', to)
            .set('criteria', criteria);

        return this.http.get<any>(`${this.apiUrl}/drivers/statistics`, { params });
    }
}