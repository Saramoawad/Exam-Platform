import { Component, inject, OnInit, signal } from '@angular/core';
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
export class StudentsResultsComponent implements OnInit {
  private resultService = inject(ResultService);
  results?:Result[];
  isLoading = signal(true);

  constructor() {
  }

  ngOnInit() {
    this.resultService.getAllResults().subscribe({
      next: (res: any) => {
        setTimeout(() => {

          this.results =res
          this.isLoading.set(false);
        }, 500);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  deleteResult(id: string) {
    if (confirm('Are you sure you want to delete this result?')) {
      this.resultService.deleteResult(id).subscribe({
        next: () => {
          this.results = this.results?.filter(r => r._id !== id);
        },
        error: (err) => console.error(err),
      });
    }
  }
}
