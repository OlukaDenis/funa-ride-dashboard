import { Component, OnInit } from '@angular/core';
import { DashCard } from '../../models/dash-card.model';
import { CommonModule } from '@angular/common';
import { DashCardComponent } from "../../components/dash-card/dash-card.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DashCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  items: DashCard[] = []

  constructor() { }

  ngOnInit(): void {
    this.buildDashInsights();
  }


  buildDashInsights() {
    this.items = [
      {
        title: 'New Drivers',
        content: '20'
      },
      {
        title: 'New Passengers',
        content: '100'
      },
      {
        title: 'New Trips',
        content: '430'
      }
    ]
  }

}
