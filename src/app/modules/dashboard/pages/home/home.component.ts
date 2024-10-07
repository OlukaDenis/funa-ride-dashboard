import { Component, OnInit } from '@angular/core';
import { DashCard } from '../../models/dash-card.model';
import { CommonModule } from '@angular/common';
import { DashCardComponent } from "../../components/dash-card/dash-card.component";
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DashCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  items: DashCard[] = [];
  isLoading = true;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.fetchDashInsights();
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
        // Handle error (e.g., show error message to user)
      }
    );
  }
}
