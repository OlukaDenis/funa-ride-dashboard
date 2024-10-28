import { Injectable } from '@angular/core';
import { formatDate, formatCurrency } from '@angular/common';


@Injectable({
    providedIn: 'root'
})
export class HelperService {
    locale = 'en-UG';
    currencyCode = 'UGX';
    constructor() { }

    formatAppDate(date: string): string {
        return formatDate(date, 'dd/MM/yyyy', this.locale) || '';
    }

    formatDateTime(date: string): string {
        if (!date) return '';
        return formatDate(date, 'dd/MM/yyyy HH:mm', this.locale) || '';
    }

    formatNumber(value: number, decimalPlaces: number = 0): string {
        return value.toLocaleString('en-US', {
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces
        });
    }

    public formatAppCurrency(currency: any): string {
        try {
            return formatCurrency(
                Number(currency),
                this.locale,
                this.currencyCode,
                this.currencyCode,
                '1.0-0' // This formats the number with no 2 decimal places
            ) || '';
        } catch (error) {
            console.log(error);
            return '';
        }
    }
}
