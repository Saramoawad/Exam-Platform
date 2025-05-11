

import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../../../core/services/question.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-submit-exam',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxSpinnerModule],
  templateUrl: './submit-exam.component.html',
  styleUrls: ['./submit-exam.component.css']
})
export class SubmitExamComponent implements OnInit {
  examId: string = '';
  selectedAnswers: { [key: string]: string } = {};
  isSubmitted = false;
  message: string = '';
  submissionId: string = '';
  isLoading = false;

  private questionService = inject(QuestionService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private spinner = inject(NgxSpinnerService);

  constructor() {}

  ngOnInit(): void {
    this.examId = this.route.snapshot.paramMap.get('id') || '';
    const storedAnswers = localStorage.getItem(`exam-${this.examId}-answers`);
    if (storedAnswers) {
      this.selectedAnswers = JSON.parse(storedAnswers);
      if (Object.keys(this.selectedAnswers).length === 0) {
        this.message = 'No answers selected. Please answer at least one question.';
      }
    } else {
      this.message = 'No answers found. Please take the exam first.';
    }
  }

  get hasSelectedAnswers(): boolean {
    return this.selectedAnswers && Object.keys(this.selectedAnswers).length > 0;
  }

  onSubmit(): void {
    if (!this.hasSelectedAnswers) {
      this.message = 'No answers to submit.';
      return;
    }

    this.isLoading = true;
    this.spinner.show();

    const answersArray = Object.keys(this.selectedAnswers).map(questionId => ({
      questionId,
      answer: this.selectedAnswers[questionId]
    }));


    this.questionService.submitExam(this.examId, answersArray).subscribe({
      next: (response: { status: string, data: { message: string, submissionId: string } }) => {
        if (response.status === 'success') {
          this.isSubmitted = true;
          this.message = response.data.message;
          this.submissionId = response.data.submissionId;
        }
      },
      error: (err) => {
        console.error('Error submitting exam:', err);
        this.message = 'Failed to submit exam';
      },
      complete: () => {
        this.isLoading = false;
        this.spinner.hide();
      }
    });
  }

  goToResults(): void {
    this.router.navigate(['/student/view-result', this.submissionId]);
  }

  goBackToExam(): void {
    this.router.navigate(['/student/take-exam', this.examId]);
  }
}
