import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../../../../core/services/question.service';
import { Question } from '../../../../core/models/question.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-question',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent implements OnInit {
  currentQuestion: Partial<Question> = {
    question: '',
    choices: { a: '', b: '', c: '', d: '' },
    correctAnswer: 'a',
    difficulty: 1,
  };

  constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.questionService.getQuestion(id).subscribe({
        next: (response) => {
          if (response.status === 'success' && response.data) {
            this.currentQuestion = response.data;
          }
        },
        error: (err) => console.error('Error fetching question:', err)
      });
    }
  }

  saveQuestion(): void {
    if (this.currentQuestion._id) {
      this.questionService.updateQuestion(this.currentQuestion._id, this.currentQuestion).subscribe({
        next: (response) => {
          if (response.status === 'success') {
            this.router.navigate(['/teacher/exam', this.currentQuestion.exam?._id]);
          }
        },
        error: (err) => console.error('Error updating question:', err)
      });
    }
  }

  cancelForm(): void {
    this.router.navigate(['/teacher/question-crud']);
  }
}
