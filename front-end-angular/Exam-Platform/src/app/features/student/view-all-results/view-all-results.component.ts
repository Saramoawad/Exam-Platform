import { Component, OnInit } from '@angular/core';
import { ResultService } from '../../../core/services/result.service';
import { Result } from '../../../core/models/result.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-view-all-results',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './view-all-results.component.html',
  styleUrls: ['./view-all-results.component.css']
})
export class ViewAllResultsComponent implements OnInit {
  results: Result[] = [];
  loading = true;
  error = '';

  constructor(private resultService: ResultService) {}

  ngOnInit(): void {
    this.resultService.getStudentResults().subscribe({
      next: (res) => {
        this.results = res;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load results';
        this.loading = false;
        console.error(err);
      }
    });
  }
}
