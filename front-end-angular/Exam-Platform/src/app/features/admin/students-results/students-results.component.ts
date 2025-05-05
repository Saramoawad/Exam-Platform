import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultService } from '../../../core/services/result.service';
import { Result } from '../../../core/models/result.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-students-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './students-results.component.html',
  styleUrls: ['./students-results.component.css'],
})
export class StudentsResultsComponent {
  private resultService = inject(ResultService);
  results = signal<Result[]>([]);
  isLoading = signal(true);

  constructor() {
    this.fetchResults();
  }

  fetchResults() {
    this.resultService.getAllResults().subscribe({
      next: (data: any) => {
        this.results.set(data.data); 
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.isLoading.set(false);
      },
    });
  }

  deleteResult(id: string) {
    if (confirm('Are you sure you want to delete this result?')) {
      this.resultService.deleteResult(id).subscribe({
        next: () => {
          this.results.update(results => results.filter(r => r._id !== id));
        },
        error: (err) => console.error(err),
      });
    }
  }
}
