import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DriverService } from '@app/core/services/driver.service';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Driver } from '../../models/driver.model';

@Component({
  selector: 'app-incomplete-driver-list',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule, FormsModule],
  templateUrl: './incomplete-driver-list.component.html',
  styleUrl: './incomplete-driver-list.component.scss'
})

export class IncompleteDriverListComponent implements OnInit {
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

  constructor(
    private driverService: DriverService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadDrivers();
  }

  loadDrivers(): void {
    this.isLoading = true;
    this.driverService.getIncompleteDrivers().subscribe(
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
    // this.filteredDrivers = this.allDrivers.filter(driver =>
    //   (driver.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    //     driver.lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    //     driver.email.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
    //   (this.statusFilter === 'all' || driver.accountState === this.statusFilter)
    // );
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
}
