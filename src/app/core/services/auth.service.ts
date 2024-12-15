import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StorageService } from './storage.service';

export interface LoginResponse {
    userId?: number;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    email?: string;
    isActive?: boolean;
    isVerified?: boolean;
    accessToken?: string;
    refreshToken?: string;
    refreshTokenExpires?: string;
}


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://funaride-env.eba-uiksmvzw.eu-west-2.elasticbeanstalk.com'; // Replace with your actual API base URL

    constructor(private http: HttpClient, private storage: StorageService) { }

    login(email: string, password: string): Observable<any> {
        const headers = new HttpHeaders()
            .set('Accpet', '*/*')
            .set('Content-Type', 'application/json');

        return this.http.post<LoginResponse>(`${this.apiUrl}/users/login`, { email, password }, { headers }).pipe(
            tap(response => {
                if (response?.accessToken) {
                    this.storage.saveAccessToken(response.accessToken);
                }

                this.storage.saveUser(response);
                // if (response?.refreshToken) {
                //     localStorage.setItem('refreshToken', response.refreshToken);
                // }
                // if (response?.userId !== undefined) {
                //     localStorage.setItem('userId', response.userId.toString());
                // }
            })
        );
    }

    logout(): void {
        this.storage.removeUser();
        this.storage.removeAccessToken();
    }

    getAccessToken(): string | null {
        return this.storage.getAccessToken
    }
}