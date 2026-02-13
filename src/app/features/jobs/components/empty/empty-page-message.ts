import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empty-page-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl:'./empty-page-message.html'
})
export class EmptyPageMessageComponent {
  @Output() nextPage = new EventEmitter<void>();
  @Output() clearFilters = new EventEmitter<void>();

  onNextPage(): void {
    this.nextPage.emit();
  }

  onClearFilters(): void {
    this.clearFilters.emit();
  }
}