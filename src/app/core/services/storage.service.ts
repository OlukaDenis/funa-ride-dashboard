import { Injectable } from "@angular/core";
import { LoginResponse } from "./auth.service";

@Injectable({
    providedIn: 'root'
})

export class StorageService {

    get getSavedUser(): LoginResponse {
        const user: LoginResponse = JSON.parse(localStorage.getItem('user') || '{}');
        return user;
    }

    saveUser(user: LoginResponse) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    saveAccessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

    get getAccessToken(): string {
        return localStorage.getItem('accessToken') || '';
    }

    removeAccessToken = () => localStorage.removeItem('accessToken');

    removeUser = () => localStorage.removeItem('user');
}