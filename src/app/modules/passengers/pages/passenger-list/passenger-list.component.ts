import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { User, UserResponse } from 'src/app/core/models/user.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SharedModule } from '@app/shared/shared.module';
import { PaginationChange } from '@app/shared/components/pagination-component/pagination-component.component';
import { ExportService } from '@app/core/services/export.service';
import { HelperService } from '@app/core/services/helper.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-passenger-list',
  templateUrl: './passenger-list.component.html',
  styleUrls: ['./passenger-list.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, SharedModule]
})
export class PassengerListComponent implements OnInit {
  users: User[] = [];
  totalItems = 0;
  currentPage = 1;
  totalPages = 1;
  perPage = 10;
  order = 'DESC';
  searchForm!: FormGroup;
  Math = Math;
  isLoading = false;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private exportService: ExportService,
    public helpers: HelperService
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
    this.isLoading = true;
    const searchTerm = this.searchForm.get('search')?.value;
    this.userService.getUsers(this.currentPage, this.perPage).subscribe({
      next: (response: UserResponse) => {
        this.isLoading = false;
        this.users = response.content;
        this.totalItems = response.totalElements;
        this.totalPages = response.totalPages;
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error loading users', error);
      }
    });
  }

  onPageChange(change: PaginationChange): void {
    this.currentPage = change.currentPage;
    this.perPage = change.pageSize;
    this.loadUsers();
  }

  onPreviousPage(): void {
    this.currentPage--;
    this.loadUsers();
  }

  onNextPage(): void {
    this.currentPage++;
    this.loadUsers();
  }

  /**
  * Exports the driver list to PDF format
  */
  exportToPDF(): void {
    const tableColumn = ["Name", "Email", "Phone", 'Joined On', "Status"];
    const tableRows: any[] = [];

    // Prepare the data
    this.users.forEach(driver => {
      const driverData = [
        `${driver.firstName} ${driver.lastName}`,
        driver.email,
        driver.phoneNumber,
        this.helpers.formatAppDate(driver.dateCreated),
        driver.accountState
      ];
      tableRows.push(driverData);
    });

    this.exportService.exportToPDF(tableColumn, tableRows);
  }

  /**
   * Exports the driver list to Excel format
   */
  exportToExcel(): void {
    // Prepare the data
    const data = this.users.map(driver => ({
      'First Name': driver.firstName,
      'Last Name': driver.lastName,
      'Email': driver.email,
      'Phone': driver.phoneNumber,
      'Status': driver.accountState
    }));

    this.exportService.exportToExcel(data, 'Passengers');
  }
}
