import { environment } from "src/environments/environment";

import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class TripService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getTrips(page: number, perPage: number): Observable<any> {
        let params = new HttpParams()
            .set('page', page.toString())
            .set('perPage', perPage.toString());

        return this.http.get<any>(`${this.apiUrl}/rides/current`, { params });
    }
}