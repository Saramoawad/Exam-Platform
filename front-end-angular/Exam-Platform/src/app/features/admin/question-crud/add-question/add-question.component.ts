import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '../../../../core/services/question.service';
import { Question } from '../../../../core/models/question.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-question',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  currentQuestion: Partial<Question> = {
    question: '',
    choices: { a: '', b: '', c: '', d: '' },
    correctAnswer: 'a',
    difficulty: 1,
    marks: 10,
    exam: { _id: '', title: '' },
    user: { _id: '', name: '' }
  };

  constructor(
    private questionService: QuestionService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  saveQuestion(): void {
    this.questionService.createQuestion(this.currentQuestion).subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this.router.navigate(['/teacher/question-crud']);
        }
      },
      error: (err) => console.error('Error creating question:', err)
    });
  }

  cancelForm(): void {
    this.router.navigate(['/teacher/question-crud']);
  }
}