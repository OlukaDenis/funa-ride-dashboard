import { Component, OnInit } from '@angular/core';
import { DashCard } from '../../models/dash-card.model';
import { CommonModule } from '@angular/common';
import { DashCardComponent } from "../../components/dash-card/dash-card.component";
import { DashboardService } from '../../services/dashboard.service';
import { ChartComponent } from "ng-apexcharts";
import { ApexChart, ApexAxisChartSeries } from "ng-apexcharts";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from "../../../../shared/shared.module";
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    DashCardComponent,
    ChartComponent,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  items: DashCard[] = [];

  isLoading = true;
  loadingTrips = true;
  loadingUsers = true;
  loadingDrivers = true;

  chartOptions: any;
  tripData: any[] = [];
  userData: any[] = [];
  driverData: any[] = [];
  userChartOptions: any;
  driverChartOptions: any;

  startYear = 2020;
  currentYear: number = new Date().getFullYear();
  years: number[] = [];

  selectedTripYear: number = this.currentYear;
  selectedUserYear: number = this.currentYear;
  selectedDriverYear: number = this.currentYear;

  thirtyDaysAgo: string = moment().subtract(30, 'days').format('YYYY-MM-DD');
  today: string = moment().format('YYYY-MM-DD');

  isCriteriaMonthly = true;
  selectedTripRange: { start: string; end: string } = { start: this.thirtyDaysAgo, end: this.today };
  selectedUserRange: { start: string; end: string } = { start: this.thirtyDaysAgo, end: this.today };
  selectedDriverRange: { start: string; end: string } = { start: this.thirtyDaysAgo, end: this.today };

  minToDate: string = '';
  maxToDate: string = '';



  MONTHLY = 'MONTHLY';
  WEEKLY = 'WEEKLY';

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.generateYears();

    this.fetchDashInsights();
    this.fetchTripsSummary();
    this.fetchUsersSummary();
    this.fetchDriversSummary();
  }

  generateYears() {
    const endYear = this.currentYear;
    this.years = Array.from({ length: endYear - this.startYear + 1 }, (_, i) => this.startYear + i);
  }

  toggleCombined() {
    this.isCriteriaMonthly = !this.isCriteriaMonthly;
    this.fetchDriversSummary();
    this.fetchTripsSummary();
    this.fetchUsersSummary();
  }

  fetchDashInsights() {
    this.isLoading = true;
    this.dashboardService.getDashboardTotals().subscribe(
      (data) => {
        this.items = [
          {
            title: 'Unapproved Drivers',
            content: data.un_approved_drivers.toString()
          },
          {
            title: 'Approved Drivers',
            content: data.approved_drivers.toString()
          },
          {
            title: 'Total Passengers',
            content: data.total_passengers.toString()
          },
          {
            title: 'Total Trips',
            content: data.total_routines.toString()
          }
        ];
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching dashboard data:', error);
        this.isLoading = false;
      }
    );
  }

  onTripYearChange(value: number) {
    this.selectedTripYear = value;
    this.fetchTripsSummary();
  }

  onUserYearChange(year: number) { // Add this method
    this.selectedUserYear = year;
    this.fetchUsersSummary();
  }

  onDriverYearChange(year: number) { // Add this method
    this.selectedDriverYear = year;
    this.fetchDriversSummary();
  }

  onTripDateRangeSelected(range: { start: Date; end: Date }) {
    this.selectedTripRange = {
      start: this.formatDate(range.start),
      end: this.formatDate(range.end)
    };
    this.fetchTripsSummary();
  }

  onUserDateRangeSelected(range: { start: Date; end: Date }) {
    this.selectedUserRange = {
      start: this.formatDate(range.start),
      end: this.formatDate(range.end)
    };
    this.fetchUsersSummary();
  }

  onDriverDateRangeSelected(range: { start: Date; end: Date }) {
    this.selectedDriverRange = {
      start: this.formatDate(range.start),
      end: this.formatDate(range.end)
    };
    this.fetchDriversSummary();
  }

  fetchTripsSummary() {
    this.loadingTrips = true;
    this.dashboardService.getTripsSummary(
      this.isCriteriaMonthly ? `${this.selectedTripYear}-01-01` : this.selectedTripRange.start,
      this.isCriteriaMonthly ? `${this.selectedTripYear}-12-31` : this.selectedTripRange.end,
      this.isCriteriaMonthly ? this.MONTHLY : this.WEEKLY
    ).subscribe({
      next: (res: any) => {
        this.processTripsData(res);
        this.loadingTrips = false;
      },
      error: (err: any) => {
        console.log(err);
        this.loadingTrips = false;
      }
    })
  }

  fetchUsersSummary() {
    this.loadingUsers = true;
    this.dashboardService.getUsersSummary(
      this.isCriteriaMonthly ? `${this.selectedUserYear}-01-01` : this.selectedUserRange.start,
      this.isCriteriaMonthly ? `${this.selectedUserYear}-12-31` : this.selectedUserRange.end,
      this.isCriteriaMonthly ? this.MONTHLY : this.WEEKLY
    ).subscribe({
      next: (res: any) => {
        this.processUsersData(res);
        this.loadingUsers = false;
      },
      error: (err: any) => {
        console.log(err);
        this.loadingUsers = false;
      }
    });
  }

  fetchDriversSummary() {
    this.loadingDrivers = true;
    this.dashboardService.getDriversSummary(
      this.isCriteriaMonthly ? `${this.selectedDriverYear}-01-01` : this.selectedDriverRange.start,
      this.isCriteriaMonthly ? `${this.selectedDriverYear}-12-31` : this.selectedDriverRange.end,
      this.isCriteriaMonthly ? this.MONTHLY : this.WEEKLY
    ).subscribe({
      next: (res: any) => {
        this.processDriversData(res);
        this.loadingDrivers = false;
      },
      error: (err: any) => {
        console.log(err);
        this.loadingDrivers = false;
      }
    });
  }

  processTripsData(trips: any[]) {
    this.tripData = trips;

    this.chartOptions = {
      chart: {
        type: 'bar'
      },
      series: [{
        name: 'Number of Trips',
        data: this.tripData.map(data => data.count)
      }],
      xaxis: {
        categories: this.tripData.map(data => data.month || data.week)
      }
    };
  }

  processUsersData(users: any[]) {
    this.userData = users;
    this.userChartOptions = {
      chart: {
        type: 'bar'
      },
      series: [{
        name: 'Number of Users',
        data: this.userData.map(data => data.count)
      }],
      xaxis: {
        categories: this.userData.map(data => data.month || data.week)
      }
    };
  }

  processDriversData(drivers: any[]) {
    this.driverData = drivers;

    this.driverChartOptions = {
      chart: {
        type: 'bar'
      },
      series: [{
        name: 'Number of Drivers',
        data: this.driverData.map(data => data.count)
      }],
      xaxis: {
        categories: this.driverData.map(data => data.month || data.week)
      }
    };
  }

  formatDate(date: Date): string {
    return date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
  }
}
