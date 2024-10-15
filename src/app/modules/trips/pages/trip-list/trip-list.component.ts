import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TripModel } from '../../models/trip.model';
import { TripService } from '@app/core/services/trip.service';
import { EmptyListComponentComponent } from '@app/shared/components/empty-list-component/empty-list-component.component';


@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule, FormsModule, EmptyListComponentComponent],
  templateUrl: './trip-list.component.html',
  styleUrl: './trip-list.component.scss'
})

export class TripListComponent implements OnInit {
  trips: TripModel[] = [];
  filteredTrips: TripModel[] = [];
  currentPage = 1;
  totalPages = 1;
  perPage = 10;
  isLoading = false;
  activeDropdown: number | null = null;
  searchTerm: string = '';

  constructor(
    private tripService: TripService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadTrips();
  }

  loadTrips(): void {
    this.isLoading = true;

    this.tripService.getTrips(this.currentPage, this.perPage).subscribe(
      (response) => {
        this.trips = response.content;
        this.filteredTrips = this.trips;
        this.totalPages = response.totalPages;
        this.isLoading = false;
        this.applySearchFilter();
      },
      (error) => {
        console.error('Error fetching trips:', error);
        this.isLoading = false;
      }
    );
  }

  applySearchFilter(): void {
    this.filteredTrips = this.trips.filter(trip =>
      trip.driverFirstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      trip.driverLastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      trip.driverEmail.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onSearchChange(): void {
    this.applySearchFilter();
  }

  onStatusFilterChange(): void {
    this.loadTrips();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadTrips();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadTrips();
    }
  }

  toggleDropdown(tripId: number): void {
    this.activeDropdown = this.activeDropdown === tripId ? null : tripId;
  }

  viewTrip(tripId: number): void {
    // this.router.navigate(['/app/trips', tripId]);
  }
}