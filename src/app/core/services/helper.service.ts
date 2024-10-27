import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';


@Injectable({
    providedIn: 'root'
})
export class HelperService {
    constructor(private datePipe: DatePipe) { }

    formatDate(date: string): string {
        return this.datePipe.transform(date, 'dd/MM/yyyy') || '';
    }

    formatDateTime(date: string): string {
        if (!date) return '';
        return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm') || '';
    }

    formatNumber(value: number, decimalPlaces: number = 0): string {
        return value.toLocaleString('en-US', {
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces
        });
    }
}
