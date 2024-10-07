import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { User, UserResponse } from 'src/app/core/models/user.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CommonModule, DatePipe } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-passenger-list',
  templateUrl: './passenger-list.component.html',
  styleUrls: ['./passenger-list.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, AngularSvgIconModule]
})
export class PassengerListComponent implements OnInit {
  users: User[] = [];
  totalItems = 0;
  pageSize = 10;
  currentPage = 1
  searchForm!: FormGroup;
  Math = Math;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      search: ['']
    });

    this.loadUsers();

    this.searchForm.get('search')?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(() => {
      this.currentPage = 1;
      this.loadUsers();
    });
  }

  loadUsers(): void {
    const searchTerm = this.searchForm.get('search')?.value;
    this.userService.getUsers(this.currentPage, this.pageSize).subscribe({
      next: (response: UserResponse) => {
        this.users = response.content;
        this.totalItems = response.totalElements;
      },
      error: (error) => console.error('Error loading users', error)
    });
  }

  formatDate(date: string): string {
    return this.datePipe.transform(date, 'medium') || '';
  }

  onPreviousPage(): void {
    this.currentPage--;
    this.loadUsers();
  }

  onNextPage(): void {
    this.currentPage++;
    this.loadUsers();
  }
}
