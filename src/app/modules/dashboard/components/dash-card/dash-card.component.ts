import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dash-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dash-card.component.html',
  styleUrl: './dash-card.component.scss'
})
export class DashCardComponent {
  @Input() title: string = '';
  @Input() content: string = '';
  @Input() isLoading: boolean = false;
}
