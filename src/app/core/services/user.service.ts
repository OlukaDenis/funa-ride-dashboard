import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserResponse } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = 'http://funaride-env.eba-uiksmvzw.eu-west-2.elasticbeanstalk.com'; // Replace with your actual API base URL

    constructor(private http: HttpClient) { }

    getUsers(page: number, perPage: number, from?: string, to?: string, order?: string): Observable<UserResponse> {
        let params = new HttpParams()
            .set('page', page.toString())
            .set('per_page', perPage.toString());

        if (from) params = params.set('from', from);
        if (to) params = params.set('to', to);
        if (order) params = params.set('order', order);

        return this.http.get<UserResponse>(`${this.apiUrl}/users`, { params });
    }
}