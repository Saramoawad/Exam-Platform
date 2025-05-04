import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-question-crud',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './question-crud.component.html',
  styleUrls: ['./question-crud.component.css']
})
export class QuestionCrudComponent implements OnInit {
  questions: any[] = [];
  newQuestion: any = { text: '', options: ['', '', '', ''], correctAnswer: '' };

  ngOnInit(): void {
    this.questions = [
      { _id: '1', text: 'What is the capital of France?', options: ['Paris', 'London', 'Berlin', 'Madrid'], correctAnswer: 'Paris' }
    ];
  }

  addQuestion(): void {
    this.questions.push({ ...this.newQuestion, _id: String(this.questions.length + 1) });
    this.newQuestion = { text: '', options: ['', '', '', ''], correctAnswer: '' };
  }

  deleteQuestion(questionId: string): void {
    this.questions = this.questions.filter(q => q._id !== questionId);
  }
}