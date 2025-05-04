import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../../../core/services/question.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-submit-exam',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './submit-exam.component.html',
  styleUrls: ['./submit-exam.component.css']
})
export class SubmitExamComponent implements OnInit {
  examId: string = '';
  selectedAnswers: { [key: string]: string } = {};
  isSubmitted = false;
  message: string = '';
  submissionId: string = '';

  private questionService = inject(QuestionService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  constructor() {}

  ngOnInit(): void {
    this.examId = this.route.snapshot.paramMap.get('examId') || '';
    const storedAnswers = localStorage.getItem(`exam-${this.examId}-answers`);
    if (storedAnswers) {
      this.selectedAnswers = JSON.parse(storedAnswers);
    } else {
      this.message = 'No answers found. Please take the exam first.';
    }
  }

  // Getter to check if there are any selected answers
  get hasSelectedAnswers(): boolean {
    return this.selectedAnswers && Object.keys(this.selectedAnswers).length > 0;
  }

  onSubmit(): void {
    if (!this.hasSelectedAnswers) {
      this.message = 'No answers to submit.';
      return;
    }

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
          // Clear answers from localStorage after submission
          localStorage.removeItem(`exam-${this.examId}-answers`);
        }
      },
      error: (err) => {
        console.error('Error submitting exam:', err);
        this.message = 'Failed to submit exam';
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