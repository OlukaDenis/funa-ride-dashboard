import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DriverService } from '@app/core/services/driver.service';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Driver } from '../../models/driver.model';
import { SharedModule } from '@app/shared/shared.module';

@Component({
  selector: 'app-drivers-with-debts',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './drivers-with-debts.component.html',
  styleUrl: './drivers-with-debts.component.scss'
})
export class DriversWithDebtsComponent {
  drivers: Driver[] = [];
  filteredDrivers: Driver[] = [];
  currentPage = 1;
  totalPages = 1;
  perPage = 10;
  order = 'DESC';
  isLoading = false;
  activeDropdown: number | null = null;
  searchTerm: string = '';

  constructor(
    private driverService: DriverService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadDrivers();
  }

  loadDrivers(): void {
    this.isLoading = true;

    this.driverService.getDriversWithDebts(this.currentPage, this.perPage).subscribe(
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
}
