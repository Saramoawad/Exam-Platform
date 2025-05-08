import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResultService } from '../../../core/services/result.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-result.component.html',
  styleUrls: ['./view-result.component.css']
})
export class ViewResultComponent implements OnInit {
  result: any = null;
  submissionId: string = '';

  constructor(
    private route: ActivatedRoute,
    private resultService: ResultService
  ) {}

  ngOnInit(): void {
    this.submissionId = this.route.snapshot.paramMap.get('id') || '';
    if (this.submissionId) {
      this.resultService.getResultById(this.submissionId).subscribe({
        next: (result) => {
          this.result = result;
        },
        error: (err) => {
          console.error('Error fetching result:', err);
          this.result = null;
        }
      });
    }
  }
}
