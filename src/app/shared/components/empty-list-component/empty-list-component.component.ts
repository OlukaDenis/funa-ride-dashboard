import { Component } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-empty-list-component',
  standalone: true,
  imports: [SvgIconComponent],
  templateUrl: './empty-list-component.component.html',
  styleUrl: './empty-list-component.component.scss'
})
export class EmptyListComponentComponent {
  message = 'No data found';

}