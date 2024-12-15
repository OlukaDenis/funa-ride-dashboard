import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss'],
})
export class DateRangePickerComponent {
  @Output() dateRangeSelected = new EventEmitter<{ start: Date; end: Date }>();

  showDatePicker = false;
  currentMonth = new Date();
  currentYear = this.currentMonth.getFullYear();
  selectedStartDate: Date | null = new Date(new Date().setDate(new Date().getDate() - 30));
  selectedEndDate: Date | null = new Date();
  hoveredDate: Date | null = null;
  days: Date[] = [];
  weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  maxRangeDays = 30;

  years: number[] = Array.from({ length: 31 }, (_, i) => 2020 + i);

  get selectedRange(): string | null {
    if (this.selectedStartDate && this.selectedEndDate) {
      return `${this.formatDate(this.selectedStartDate)} - ${this.formatDate(
        this.selectedEndDate
      )}`;
    }
    return null;
  }

  ngOnInit() {
    this.generateCalendar();
  }

  toggleDatePicker() {
    this.showDatePicker = !this.showDatePicker;
  }

  // generateCalendar() {
  //   const firstDay = new Date(
  //     this.currentMonth.getFullYear(),
  //     this.currentMonth.getMonth(),
  //     1
  //   );
  //   const lastDay = new Date(
  //     this.currentMonth.getFullYear(),
  //     this.currentMonth.getMonth() + 1,
  //     0
  //   );

  //   const dates: Date[] = [];
  //   for (
  //     let date = new Date(firstDay);
  //     date <= lastDay;
  //     date.setDate(date.getDate() + 1)
  //   ) {
  //     dates.push(new Date(date));
  //   }
  //   this.days = dates;
  // }

  generateCalendar() {
    const firstDay = new Date(this.currentYear, this.currentMonth.getMonth(), 1);
    const lastDay = new Date(this.currentYear, this.currentMonth.getMonth() + 1, 0);

    const dates: Date[] = [];
    for (
      let date = new Date(firstDay);
      date <= lastDay;
      date.setDate(date.getDate() + 1)
    ) {
      dates.push(new Date(date));
    }
    this.days = dates;
  }

  prevMonth() {
    this.currentMonth = new Date(
      this.currentYear,
      this.currentMonth.getMonth() - 1,
      1
    );
    this.updateYearAndMonth();
    this.generateCalendar();
  }

  // prevMonth() {
  //   this.currentMonth = new Date(
  //     this.currentMonth.getFullYear(),
  //     this.currentMonth.getMonth() - 1,
  //     1
  //   );
  //   this.generateCalendar();
  // }

  nextMonth() {
    this.currentMonth = new Date(
      this.currentYear,
      this.currentMonth.getMonth() + 1,
      1
    );
    this.updateYearAndMonth();
    this.generateCalendar();
  }

  // nextMonth() {
  //   this.currentMonth = new Date(
  //     this.currentMonth.getFullYear(),
  //     this.currentMonth.getMonth() + 1,
  //     1
  //   );
  //   this.generateCalendar();
  // }

  onYearChange(event: Event) {
    const year = (event.target as HTMLSelectElement).value;
    this.currentYear = parseInt(year, 10);
    this.currentMonth = new Date(this.currentYear, this.currentMonth.getMonth(), 1);
    this.generateCalendar();
  }

  updateYearAndMonth() {
    this.currentYear = this.currentMonth.getFullYear();
  }

  // selectDate(date: Date) {
  //   if (!this.selectedStartDate || (this.selectedEndDate && this.selectedStartDate)) {
  //     this.selectedStartDate = date;
  //     this.selectedEndDate = null;
  //   } else if (!this.selectedEndDate && this.isSelectable(date)) {
  //     this.selectedEndDate = date;
  //     if (this.selectedStartDate > this.selectedEndDate) {
  //       [this.selectedStartDate, this.selectedEndDate] = [
  //         this.selectedEndDate,
  //         this.selectedStartDate,
  //       ];
  //     }
  //   }
  // }

  selectDate(date: Date) {
    if (!this.selectedStartDate || (this.selectedEndDate && this.selectedStartDate)) {
      this.selectedStartDate = date;
      this.selectedEndDate = null;
    } else if (!this.selectedEndDate && this.isSelectable(date)) {
      this.selectedEndDate = date;
      if (this.selectedStartDate > this.selectedEndDate) {
        [this.selectedStartDate, this.selectedEndDate] = [
          this.selectedEndDate,
          this.selectedStartDate,
        ];
      }
    }
  }

  onHover(date: Date | null) {
    this.hoveredDate = date;
  }

  isInHoverRange(date: Date): boolean {
    if (this.selectedStartDate && this.hoveredDate && !this.selectedEndDate) {
      const rangeStart = this.selectedStartDate;
      const rangeEnd = this.hoveredDate > this.selectedStartDate ? this.hoveredDate : rangeStart;
      const diff = (rangeEnd.getTime() - rangeStart.getTime()) / (1000 * 60 * 60 * 24);
      return date >= rangeStart && date <= rangeEnd && diff <= this.maxRangeDays;
    }
    return false;
  }

  isSelected(date: Date): boolean {
    return !!(
      this.selectedStartDate &&
      this.selectedEndDate &&
      date >= this.selectedStartDate &&
      date <= this.selectedEndDate
    );
  }

  isSelectable(date: Date): boolean {
    if (this.selectedStartDate) {
      const diff = Math.abs(
        (date.getTime() - this.selectedStartDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      return diff <= this.maxRangeDays;
    }
    return true;
  }

  clearSelection() {
    this.selectedStartDate = null;
    this.selectedEndDate = null;
    this.hoveredDate = null;
  }

  applySelection() {
    if (this.selectedStartDate && this.selectedEndDate) {
      // Emit the selected range
      this.dateRangeSelected.emit({
        start: this.selectedStartDate,
        end: this.selectedEndDate,
      });
    }
    this.showDatePicker = false;
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }
}
