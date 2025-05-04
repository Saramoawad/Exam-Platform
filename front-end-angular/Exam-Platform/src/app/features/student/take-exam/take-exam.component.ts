import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../core/services/question.service';
import { Observable } from 'rxjs';
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

  constructor(private route: ActivatedRoute, private questionService: QuestionService) {}

  ngOnInit(): void {
    this.examId = this.route.snapshot.paramMap.get('examId') || '';
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
    console.log('Selected Answers:', this.selectedAnswers);
  }
}