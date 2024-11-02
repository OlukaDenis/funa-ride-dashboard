import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DriverService } from '@app/core/services/driver.service';
import { PaginationChange } from '@app/shared/components/pagination-component/pagination-component.component';
import { SharedModule } from '@app/shared/shared.module';
import { ExportService } from '@app/core/services/export.service';

@Component({
  selector: 'app-failed-driver-registrations',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './failed-driver-registrations.component.html',
  styleUrl: './failed-driver-registrations.component.scss'
})

export class FailedDriverRegistrationsComponent implements OnInit {
  allDrivers: any[] = [];
  // filteredDrivers: any[] = [];
  paginatedDrivers: any[] = [];
  currentPage = 1;
  totalPages = 1;
  perPage = 10;
  isLoading = false;
  activeDropdown: string | null = null;
  searchTerm: string = '';
  statusFilter: string = 'all';
  selectedDriver: any;
  driverComment: string = '';
  updatingDriver = false;

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
    this.driverService.getFailedDrivers().subscribe(
      (response) => {
        this.allDrivers = response;
        this.applyFilters();
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching drivers:', error);
        this.isLoading = false;
      }
    );
  }

  applyFilters(): void {
    this.totalPages = Math.ceil(this.allDrivers.length / this.perPage);
    this.currentPage = 1;
    this.updatePaginatedDrivers();
  }

  updatePaginatedDrivers(): void {
    const startIndex = (this.currentPage - 1) * this.perPage;
    const endIndex = startIndex + this.perPage;
    this.paginatedDrivers = this.allDrivers.slice(startIndex, endIndex);
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onStatusFilterChange(): void {
    this.applyFilters();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedDrivers();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedDrivers();
    }
  }

  toggleDropdown(driverId: string): void {
    this.activeDropdown = this.activeDropdown === driverId ? null : driverId;
  }

  viewDriver(driverId: number): void {
    this.router.navigate(['/app/drivers', driverId]);
  }

  deactivateDriver(driverId: number): void {
    console.log('Deactivate driver:', driverId);
    // Implement deactivate driver logic here
  }

  onPageChange(change: PaginationChange): void {
    this.currentPage = change.currentPage;
    this.perPage = change.pageSize;
    this.updatePaginatedDrivers();
  }

  /**
 * Exports the driver list to PDF format
 */
  exportToPDF(): void {
    const tableColumn = ["Name", "Email", "Phone", "Status"];
    const tableRows: any[] = [];

    // Prepare the data
    this.allDrivers.forEach(driver => {
      const driverData = [
        `${driver.first_name} ${driver.last_name}`,
        driver.email,
        driver.phone_number,
        driver.engaged ? 'Engaged' : 'Unengaged'
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
    const data = this.allDrivers.map(driver => ({
      'First Name': driver.first_name,
      'Last Name': driver.last_name,
      'Email': driver.email,
      'Phone': driver.phone_number,
      'Status': driver.engaged ? 'Engaged' : 'Unengaged'
    }));

    this.exportService.exportToExcel(data, 'Failed Registrations');
  }

  openDriverModal(driver: any) {
    const modal = document.getElementById('update_failed_status_modal') as HTMLDialogElement;
    modal.showModal();
    this.selectedDriver = driver;
    this.toggleDropdown(driver.documentId);
  }

  closeModal(): void {
    const modal = document.getElementById('update_failed_status_modal') as HTMLDialogElement;
    modal.close();
  }

  updateDriverStatus(): void {
    if (!this.driverComment.trim() || !this.selectedDriver) {
      return;
    }

    this.updatingDriver = true;
    this.driverService.completeDriverSignup(
      this.selectedDriver.documentId,
      this.selectedDriver.email,
      this.driverComment, true).subscribe({
        next: (response) => {
          // Update the driver's status in the list
          const driverIndex = this.allDrivers.findIndex(
            driver => driver.documentId === this.selectedDriver.documentId
          );
          if (driverIndex !== -1) {
            this.allDrivers[driverIndex] = {
              ...this.allDrivers[driverIndex],
              engaged: true,
              comment: this.driverComment
            };
          }

          // Update paginated drivers
          this.applyFilters();

          console.log('Driver status updated:', response);
          this.closeModal();
          this.updatingDriver = false;
        },
        error: (error) => {
          console.error('Error updating driver status:', error);
          this.updatingDriver = false;
        }
      });
  }
}
