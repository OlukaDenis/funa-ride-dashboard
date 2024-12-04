import { Component, OnInit } from '@angular/core';
import { DashCard } from '../../models/dash-card.model';
import { CommonModule } from '@angular/common';
import { DashCardComponent } from "../../components/dash-card/dash-card.component";
import { DashboardService } from '../../services/dashboard.service';
import { ChartComponent } from "ng-apexcharts";
import { ApexChart, ApexAxisChartSeries } from "ng-apexcharts";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DashCardComponent, ChartComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  items: DashCard[] = [];
  isLoading = true;
  chartOptions: any;
  monthlyData: { count: number; period: string }[] = [];
  userData: { count: number; period: string }[] = [];
  driverData: { count: number; period: string }[] = [];
  userChartOptions: any;
  driverChartOptions: any;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.fetchDashInsights();
    this.fetchTripsSummary();
    this.fetchUsersSummary();
    this.fetchDriversSummary();
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

  fetchTripsSummary() {
    this.dashboardService.getTripsSummary('2021-01-01', '2021-12-31').subscribe({
      next: (res: any) => {
        this.processTripsData(res);
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  fetchUsersSummary() {
    this.dashboardService.getUsersSummary('2020-01-01', '2020-12-31').subscribe({
      next: (res: any) => {
        this.processUsersData(res);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  fetchDriversSummary() {
    this.dashboardService.getDriversSummary('2021-01-01', '2021-12-31').subscribe({
      next: (res: any) => {
        this.processDriversData(res);
      },
      error: (err: any) => {
        console.log(err);
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
