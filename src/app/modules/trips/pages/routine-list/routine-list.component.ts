import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EmptyListComponentComponent } from '@app/shared/components/empty-list-component/empty-list-component.component';
import { SvgIconComponent } from 'angular-svg-icon';
import { RoutineModel } from '../../models/routine.model';
import { TripService } from '@app/core/services/trip.service';
import { HelperService } from '@app/core/services/helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-routine-list',
  standalone: true,
  imports: [EmptyListComponentComponent, SvgIconComponent, CommonModule],
  templateUrl: './routine-list.component.html',
  styleUrl: './routine-list.component.scss'
})
export class RoutineListComponent implements OnInit {
  activeRoutines: RoutineModel[] = [];
  expiredRoutines: RoutineModel[] = [];
  activeDropdown: number | string | null = null;
  isLoading = false;
  currentTab = 1;

  constructor(
    private tripService: TripService,
    public helperService: HelperService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadRoutines();
  }

  loadRoutines(): void {
    this.isLoading = true;
    this.loadTrips();
  }

  loadTrips(): void {
    this.isLoading = true;

    this.tripService.getRoutines().subscribe({
      next: (response) => {
        console.log(response);
        this.activeRoutines = response.valid;
        this.expiredRoutines = response.expired;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching trips:', error);
        this.isLoading = false;
      }
    });
  }

  toggleTab(tab: number): void {
    this.currentTab = tab;
  }

  viewRoutineDetails(routine: RoutineModel): void {
    this.tripService.setSelectedRoutine = routine;
    this.router.navigate(['app/trips/details']);
  }

  toggleDropdown(routineId: number): void {
    this.activeDropdown = this.activeDropdown === routineId ? null : routineId;
  }
}
