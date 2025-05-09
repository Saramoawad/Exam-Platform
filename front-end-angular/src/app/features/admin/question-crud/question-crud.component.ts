import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../../core/services/question.service';
import { Question } from '../../../core/models/question.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-crud',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './question-crud.component.html',
  styleUrls: ['./question-crud.component.css']
})
export class QuestionCrudComponent implements OnInit {
  questions: Question[] = [];

  constructor(
    private questionService: QuestionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.questionService.getAllQuestions().subscribe({
      next: (response) => {
        if (response.status === 'success' && response.data) {
          console.log(response.data)
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

  showEditForm(question: Question): void {
    this.router.navigate(['/teacher/edit-question', question._id]);
  }

  deleteQuestion(id: string): void {
    if (confirm('Are you sure you want to delete this question?')) {
      this.questionService.deleteQuestion(id).subscribe({
        next: (response) => {
            this.loadQuestions();
        },
        error: (err) => console.error('Error deleting question:', err)
      });
    }
  }
}
