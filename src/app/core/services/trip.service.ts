import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { RoutineModel } from '@app/modules/trips/models/routine.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TripService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }


    private selectedRoutine = new BehaviorSubject<RoutineModel | null>(null);
    public selectedRoutine$ = this.selectedRoutine.asObservable();

    public set setSelectedRoutine(routine: RoutineModel) {
        this.selectedRoutine.next(routine);
    }

    getTrips(page: number, perPage: number): Observable<any> {
        let params = new HttpParams()
            .set('page', page.toString())
            .set('perPage', perPage.toString());

        return this.http.get<any>(`${this.apiUrl}/rides/current`, { params });
    }

    getRoutines(minX?: number, minY?: number, maxX?: number, maxY?: number): Observable<any> {
        let params = new HttpParams();

        if (minX) {
            params = params.set('minX', minX.toString());
        }
        if (minY) {
            params = params.set('minY', minY.toString());
        }
        if (maxX) {
            params = params.set('maxX', maxX.toString());
        }
        if (maxY) {
            params = params.set('maxY', maxY.toString());
        }

        return this.http.get<any>(`${this.apiUrl}/routines`, { params });
    }
}
