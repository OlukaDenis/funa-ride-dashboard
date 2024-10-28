import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverService } from '@app/core/services/driver.service';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Driver } from '../../models/driver.model';
import { PaginationChange, PaginationComponentComponent } from '@app/shared/components/pagination-component/pagination-component.component';
import { SharedModule } from '@app/shared/shared.module';
import { ExportService } from '@app/core/services/export.service';

@Component({
  selector: 'app-driver-list',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './driver-list.component.html',
  styleUrl: './driver-list.component.scss'
})
export class DriverListComponent implements OnInit {
  drivers: Driver[] = [];
  filteredDrivers: Driver[] = [];
  currentPage = 1;
  totalPages = 1;
  perPage = 10;
  order = 'DESC';
  isLoading = false;
  activeDropdown: number | null = null;
  searchTerm: string = '';
  statusFilter: string = 'all';

  constructor(
    private driverService: DriverService,
    private exportService: ExportService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadDrivers();
  }

  loadDrivers(): void {
    this.isLoading = true;
    let active: boolean | undefined;

    if (this.statusFilter === 'active') {
      active = true;
    } else if (this.statusFilter === 'inactive') {
      active = false;
    }

    this.driverService.getDrivers(this.currentPage, this.perPage, this.order, active).subscribe(
      (response) => {
        this.drivers = response.content;
        this.filteredDrivers = this.drivers;
        this.totalPages = response.totalPages;
        this.isLoading = false;
        this.applySearchFilter();
      },
      (error) => {
        console.error('Error fetching drivers:', error);
        this.isLoading = false;
      }
    );
  }

  applySearchFilter(): void {
    this.filteredDrivers = this.drivers.filter(driver =>
      driver.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      driver.lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      driver.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onSearchChange(): void {
    this.applySearchFilter();
  }

  onStatusFilterChange(): void {
    this.loadDrivers();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadDrivers();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadDrivers();
    }
  }

  onPageChange(change: PaginationChange): void {
    this.currentPage = change.currentPage;
    this.perPage = change.pageSize;
    this.loadDrivers();
  }

  toggleDropdown(driverId: number): void {
    this.activeDropdown = this.activeDropdown === driverId ? null : driverId;
  }

  viewDriver(driverId: number): void {
    this.router.navigate(['/app/drivers', driverId]);
  }

  deactivateDriver(driverId: number): void {
    console.log('Deactivate driver:', driverId);
    // Implement deactivate driver logic here
  }

  /**
   * Exports the driver list to PDF format
   */
  exportToPDF(): void {
    const tableColumn = ["Name", "Email", "Phone", "Status"];
    const tableRows: any[] = [];

    // Prepare the data
    this.filteredDrivers.forEach(driver => {
      const driverData = [
        `${driver.firstName} ${driver.lastName}`,
        driver.email,
        driver.phoneNumber,
        driver.accountState
      ];
      tableRows.push(driverData);
    });

    this.exportService.exportToPDF(tableColumn, tableRows);
  }

  /**
   * Exports the driver list to Excel format
   */
  exportToExcel(): void {
    // Prepare the data
    const data = this.filteredDrivers.map(driver => ({
      'First Name': driver.firstName,
      'Last Name': driver.lastName,
      'Email': driver.email,
      'Phone': driver.phoneNumber,
      'Status': driver.accountState
    }));

    this.exportService.exportToExcel(data, 'Drivers');
  }
}
