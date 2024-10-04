import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

interface LoginResponse {
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

    constructor(private http: HttpClient) { }

    login(email: string, password: string): Observable<any> {
        const headers = new HttpHeaders()
            .set('Accpet', '*/*')
            .set('Content-Type', 'application/json');

        localStorage.setItem('accessToken', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJwcml2aWxlZ2VzIjpbXSwicm9sZXMiOltudWxsXSwiaXNzIjoiYXV0aCIsImV4cCI6MTcyODYxMDU2NiwidXNlcklEIjozOTUsImlhdCI6MTcyODAwNTc2Nn0.HQejv55yfo9qRoMs7-gYBResIaNzmm17FR3cOwEnyq91OodFJEJ_MgnI_QgLpqzUKj8DksVL7wj1TmbsbFj_htsC3L_6k1xCpQ3XlMTIqJWKrh_03iHRYdpRfE92eLXKfBMux4l8sTh7tz3mFPUzZUeO9vljr6btZivjsR4ePjrUW5btqw5Eb-zyUsZUlaI3rvUGvmN8UYylbBRwg2rxIqeJRLQyyXwg44iC2Xtq4mxWl15ZjChCR-Rk1vs7ItyCMcNiFiqGtAqmEooOw6ICr7KdJxfQBtaHtHPco10BdRWVFq75rlqK3xBN22QaQSLSiFsJzbGgSx4pl_dm4A_DdA');

        return this.http.post<LoginResponse>(`${this.apiUrl}/users/login`, { email, password }, { headers }).pipe(
            tap(response => {
                if (response?.accessToken) {
                    localStorage.setItem('accessToken', response.accessToken);

                }
                if (response?.refreshToken) {
                    localStorage.setItem('refreshToken', response.refreshToken);
                }
                if (response?.userId !== undefined) {
                    localStorage.setItem('userId', response.userId.toString());
                }
            })
        );
    }

    logout(): void {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userId');
    }

    getAccessToken(): string | null {
        return localStorage.getItem('accessToken');
    }
}