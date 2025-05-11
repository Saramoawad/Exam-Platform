import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../../../core/services/question.service';
import { Question } from '../../../core/models/question.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-take-exam',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './take-exam.component.html',
  styleUrls: ['./take-exam.component.css']
})
export class TakeExamComponent implements OnInit {
  examId: string = '';
  questions: Question[] = [];
  selectedAnswers: { [key: string]: string } = {};

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.examId = this.route.snapshot.paramMap.get('id') || '';
    console.log(this.examId)
    this.questionService.getQuestions(this.examId).subscribe({
      next: (response) => {
        if (response.status === 'success' && response.data) {
          this.questions = response.data;
        } else {
          this.questions = [];
        }
      },
      error: (err) => {
        console.error('Error fetching questions:', err);
        this.questions = [];
      }
    });
  }

  onAnswerSelect(questionId: string, selectedOption: string): void {
    this.selectedAnswers[questionId] = selectedOption;
  }

  onSubmit(): void {
    localStorage.setItem(`exam-${this.examId}-answers`, JSON.stringify(this.selectedAnswers));
    this.router.navigate(['/student/submit-exam/', this.examId]);
  }
}
