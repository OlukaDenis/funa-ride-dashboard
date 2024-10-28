import { Injectable } from "@angular/core";
import autoTable from 'jspdf-autotable'
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

@Injectable({
    providedIn: 'root'
})
export class ExportService {

    /**
 * Exports the driver list to PDF format
 */
    exportToPDF(tableColumn: string[], tableRows: any[]): void {
        const doc = new jsPDF();

        // Add title
        doc.setFontSize(20);
        doc.text('Drivers List', 14, 15);
        doc.setFontSize(10);

        // Add date
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 25);

        // Create the table
        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 35,
            styles: {
                fontSize: 8,
                cellPadding: 2,
                overflow: 'linebreak'
            },
        });

        // Save the PDF
        doc.save(`drivers-list-${new Date().toISOString().split('T')[0]}.pdf`);
    }

    /**
     * Exports the driver list to Excel format
     */
    exportToExcel(tableRows: any[], title: string): void {
        // Create worksheet
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(tableRows);

        // Create workbook
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, title);

        // Save the file
        XLSX.writeFile(wb, `drivers-list-${new Date().toISOString().split('T')[0]}.xlsx`);
    }
}