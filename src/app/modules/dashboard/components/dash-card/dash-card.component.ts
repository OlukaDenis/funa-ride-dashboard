import { Component, Input, OnInit } from '@angular/core';
import { DashCard } from '../../models/dash-card.model';

@Component({
  selector: 'app-dash-card',
  standalone: true,
  imports: [],
  templateUrl: './dash-card.component.html',
  styleUrl: './dash-card.component.scss'
})
export class DashCardComponent implements OnInit {

  @Input() item: DashCard = <DashCard>{};

  constructor() { }

  ngOnInit(): void {
  }


}
