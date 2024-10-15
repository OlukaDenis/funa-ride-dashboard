import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DriverService } from '@app/core/services/driver.service';
import { Driver } from '../../models/driver.model';

@Component({
  selector: 'app-driver-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './driver-detail.component.html',
  styleUrl: './driver-detail.component.scss'
})
export class DriverDetailComponent implements OnInit {
  driver: Driver | null = null;
  isLoading = false;
  currentTab = 1;

  constructor(
    private route: ActivatedRoute,
    private driverService: DriverService
  ) { }

  ngOnInit(): void {
    const driverId = this.route.snapshot.paramMap.get('id');
    if (driverId) {
      this.loadDriverDetails(+driverId);
    }
  }

  loadDriverDetails(driverId: number): void {
    this.isLoading = true;
    this.driverService.getDriverById(driverId).subscribe(
      (driver) => {
        this.driver = driver;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching driver details:', error);
        this.isLoading = false;
      }
    );
  }

  toggleTab(tab: number): void {
    this.currentTab = tab;
  }
}
