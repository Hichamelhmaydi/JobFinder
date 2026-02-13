import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { JobFilters } from '../../../../core/models/job.model';

@Component({
  selector: 'app-job-search-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './job-search-form.component.html'
})
export class JobSearchFormComponent {
  @Output() search = new EventEmitter<JobFilters>();

  searchForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      keyword: [''],
      location: ['']
    });
  }

  onSubmit(): void {
    const formValue = this.searchForm.value;

    const filters: JobFilters = {
      page: 1
    };

    if (formValue.keyword?.trim()) {
      filters.keyword = formValue.keyword.trim();
    }
    if (formValue.location?.trim()) {
      filters.location = formValue.location.trim();
    }

    this.search.emit(filters);
  }

  onReset(): void {
    this.searchForm.reset({
      keyword: '',
      location: ''
    });

    this.search.emit({ page: 1 });
  }
}