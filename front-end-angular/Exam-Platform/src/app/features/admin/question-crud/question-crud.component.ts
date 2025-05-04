import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../../core/services/question.service';
import { Question } from '../../../core/models/question.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-question-crud',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './question-crud.component.html',
  styleUrls: ['./question-crud.component.css']
})
export class QuestionCrudComponent implements OnInit {
  questions: Question[] = [];
  isFormVisible = false;
  isEditing = false;
  currentQuestion: Partial<Question> = {
    question: '',
    choices: { a: '', b: '', c: '', d: '' },
    correctAnswer: 'a',
    difficulty: 1,
    marks: 10,
    exam: { _id: '', title: '' }, 
  user: { _id: '', name: '' } 
  };

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.questionService.getAllQuestions().subscribe({
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

  showCreateForm(): void {
    this.isFormVisible = true;
    this.isEditing = false;
    this.currentQuestion = {
      question: '',
      choices: { a: '', b: '', c: '', d: '' },
      correctAnswer: 'a',
      difficulty: 1,
      marks: 10,
      exam: { _id: '', title: '' },
      user: { _id: '', name: '' } 
    };
  }

  showEditForm(question: Question): void {
    this.isFormVisible = true;
    this.isEditing = true;
    this.currentQuestion = { ...question };
  }

  cancelForm(): void {
    this.isFormVisible = false;
    this.isEditing = false;
  }

  saveQuestion(): void {
    if (this.isEditing && this.currentQuestion._id) {
      this.questionService.updateQuestion(this.currentQuestion._id, this.currentQuestion).subscribe({
        next: (response) => {
          if (response.status === 'success') {
            this.loadQuestions();
            this.isFormVisible = false;
          }
        },
        error: (err) => console.error('Error updating question:', err)
      });
    } else {
      this.questionService.createQuestion(this.currentQuestion).subscribe({
        next: (response) => {
          if (response.status === 'success') {
            this.loadQuestions();
            this.isFormVisible = false;
          }
        },
        error: (err) => console.error('Error creating question:', err)
      });
    }
  }

  deleteQuestion(id: string): void {
    if (confirm('Are you sure you want to delete this question?')) {
      this.questionService.deleteQuestion(id).subscribe({
        next: (response) => {
          if (response.status === 'success') {
            this.loadQuestions();
          }
        },
        error: (err) => console.error('Error deleting question:', err)
      });
    }
  }
}