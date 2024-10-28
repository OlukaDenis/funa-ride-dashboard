import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface PaginationChange {
  pageSize: number;
  currentPage: number;
}

@Component({
  selector: 'app-pagination-component',
  templateUrl: './pagination-component.component.html',
  styleUrl: './pagination-component.component.scss'
})
export class PaginationComponentComponent {
  @Input() currentPage = 1;
  @Input() totalPages = 1;
  @Input() pageSize = 10;
  @Input() totalItems = 0;
  @Input() pageSizeOptions: number[] = [10, 25, 50, 100];

  @Output() pageChange = new EventEmitter<PaginationChange>();

  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  shouldShowPageButton(page: number): boolean {
    if (page === 1 || page === this.totalPages) return true;
    return Math.abs(this.currentPage - page) <= 2;
  }

  showEllipsis(page: number): boolean {
    const nextPage = page + 1;
    if (nextPage >= this.totalPages) return false;
    return !this.shouldShowPageButton(nextPage) && this.shouldShowPageButton(page);
  }

  goToPage(page: number): void {
    this.emitChange(page, this.pageSize);
  }

  onPageSizeChange(newPageSize: number): void {
    this.emitChange(1, newPageSize);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  private emitChange(page: number, pageSize: number): void {
    this.pageChange.emit({ currentPage: page, pageSize });
  }

  min(a: number, b: number): number {
    return Math.min(a, b);
  }
}
