import { Component, OnInit } from '@angular/core';
import { DashCard } from '../../models/dash-card.model';
import { CommonModule } from '@angular/common';
import { DashCardComponent } from "../../components/dash-card/dash-card.component";
import { DashboardService } from '../../services/dashboard.service';
import { ChartComponent } from "ng-apexcharts";
import { ApexChart, ApexAxisChartSeries } from "ng-apexcharts";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from "../../../../shared/shared.module";

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
  monthlyData: { count: number; period: string }[] = [];
  userData: { count: number; period: string }[] = [];
  driverData: { count: number; period: string }[] = [];
  userChartOptions: any;
  driverChartOptions: any;

  startYear = 2020;
  selectedTripYear: number = this.startYear;
  selectedUserYear: number = this.startYear;
  selectedDriverYear: number = this.startYear;

  currentYear: number = new Date().getFullYear();
  years: number[] = [];

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

  fetchTripsSummary() {
    this.loadingTrips = true;
    this.dashboardService.getTripsSummary(`${this.selectedTripYear}-01-01`, `${this.selectedTripYear}-12-31`).subscribe({
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
    this.dashboardService.getUsersSummary(`${this.selectedUserYear}-01-01`, `${this.selectedUserYear}-12-31`).subscribe({
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
    this.dashboardService.getDriversSummary(`${this.selectedDriverYear}-01-01`, `${this.selectedDriverYear}-12-31`).subscribe({
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

  processTripsData(trips: { routeId: number; updatedAt: string }[]) {
    const groupedData: { [key: string]: number } = {};

    trips.forEach(trip => {
      const date = new Date(trip.updatedAt);
      const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
      groupedData[monthYear] = (groupedData[monthYear] || 0) + 1;
    });

    this.monthlyData = Object.entries(groupedData).map(([period, count]) => ({ period, count }));

    this.chartOptions = {
      chart: {
        type: 'bar'
      },
      series: [{
        name: 'Number of Trips',
        data: this.monthlyData.map(data => data.count)
      }],
      xaxis: {
        categories: this.monthlyData.map(data => data.period)
      }
    };
  }

  processUsersData(users: { dateCreated: string }[]) {
    const groupedData: { [key: string]: number } = {};
    users.forEach(user => {
      const date = new Date(user.dateCreated);
      const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
      groupedData[monthYear] = (groupedData[monthYear] || 0) + 1;
    });
    this.userData = Object.entries(groupedData).map(([period, count]) => ({ period, count }));

    this.userChartOptions = {
      chart: {
        type: 'bar'
      },
      series: [{
        name: 'Number of Users',
        data: this.userData.map(data => data.count)
      }],
      xaxis: {
        categories: this.userData.map(data => data.period)
      }
    };
  }

  processDriversData(drivers: { dateCreated: string }[]) {
    const groupedData: { [key: string]: number } = {};
    drivers.forEach(driver => {
      const date = new Date(driver.dateCreated);
      const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
      groupedData[monthYear] = (groupedData[monthYear] || 0) + 1;
    });
    this.driverData = Object.entries(groupedData).map(([period, count]) => ({ period, count }));

    this.driverChartOptions = {
      chart: {
        type: 'bar'
      },
      series: [{
        name: 'Number of Drivers',
        data: this.driverData.map(data => data.count)
      }],
      xaxis: {
        categories: this.driverData.map(data => data.period)
      }
    };
  }
}
