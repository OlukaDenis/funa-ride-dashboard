import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Map, tileLayer, marker, polyline, LatLngExpression, LatLngBoundsLiteral, Icon, icon } from 'leaflet';
import { TripService } from '@app/core/services/trip.service';
import { RoutineModel } from '../../models/routine.model';
import { Subscription } from 'rxjs';
import { SharedModule } from '@app/shared/shared.module';
import { HelperService } from '@app/core/services/helper.service';

@Component({
  selector: 'app-routine-detail',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './routine-detail.component.html',
  styleUrl: './routine-detail.component.scss'
})
export class RoutineDetailComponent implements OnInit, OnDestroy, AfterViewInit {
  routine: RoutineModel | null = null;
  map: Map | null = null;
  isLoading = false;
  private subscription: Subscription = new Subscription();
  info: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private tripService: TripService,
    public helperService: HelperService
  ) { }

  ngOnInit(): void {
    this.loadRoutineDetails();
  }

  private loadRoutineDetails(): void {
    this.isLoading = true;
    this.subscription.add(this.tripService.selectedRoutine$.subscribe({
      next: (routine) => {
        this.routine = routine;
        this.isLoading = false;
        this.info = [
          { label: 'Origin', value: this.routine?.originAddress },
          { label: 'Destination', value: this.routine?.destinationAddress },
          { label: 'Cost Per Head', value: this.helperService.formatAppCurrency(this.routine?.costPerHead || 0) },
          { label: 'Trip Date', value: this.helperService.formatDateTime(this.routine?.createdOn || '') },
          { label: 'Departure Time', value: this.routine?.departureTime },
          { label: 'Return Time', value: this.routine?.returnTime },
          { label: 'Max Passengers', value: this.routine?.maxPassengers },
          { label: 'Total Revenue', value: this.helperService.formatAppCurrency(this.routine?.totalRevenue || 0) },
          { label: 'Commission Rate', value: this.routine?.commissionRate + '%' },
          { label: 'Days', value: this.routine?.days?.days.join(', ') }
        ];
      },
      error: (error) => {
        console.error('Error loading routine:', error);
        this.isLoading = false;
      }
    }));
  }

  ngAfterViewInit() {
    this.initMap();
  }

  private initMap() {
    if (!this.routine) return;

    // Fix default icon paths
    const iconRetinaUrl = 'assets/marker-icon-2x.png';
    const iconUrl = 'assets/marker-icon.png';
    const shadowUrl = 'assets/marker-shadow.png';

    const iconDefault = icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
    // Icon.Default.prototype.options = iconDefault.options;
    Icon.Default.prototype.options.iconUrl = iconUrl;
    Icon.Default.prototype.options.iconRetinaUrl = iconRetinaUrl;
    Icon.Default.prototype.options.shadowUrl = shadowUrl;
    // Initialize the map
    this.map = new Map('map').setView([0, 0], 13);

    // Add the OpenStreetMap tiles
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Add origin marker with popup for visibility
    const originMarker = marker([this.routine.originLat, this.routine.originLng])
      .bindPopup('Origin')
      .addTo(this.map);

    // Add destination marker with popup for visibility
    const destMarker = marker([this.routine.destinationLat, this.routine.destinationLng])
      .bindPopup('Destination')
      .addTo(this.map);

    // Add path if available
    if (this.routine.path && this.routine.path.coordinates.length > 0) {
      // Convert coordinates to correct format [lat, lng]
      const formattedCoordinates = this.routine.path.coordinates.map(coord =>
        Array.isArray(coord) ? [coord[1], coord[0]] : coord
      ) as LatLngExpression[];

      const routePath = polyline(formattedCoordinates, { color: 'blue' })
        .addTo(this.map);

      // Fit the map to show all markers and path
      this.map.fitBounds(routePath.getBounds());
    } else {
      // If no path, fit to markers
      const bounds = [
        [this.routine.originLat, this.routine.originLng],
        [this.routine.destinationLat, this.routine.destinationLng]
      ] as LatLngBoundsLiteral;
      this.map.fitBounds(bounds);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
