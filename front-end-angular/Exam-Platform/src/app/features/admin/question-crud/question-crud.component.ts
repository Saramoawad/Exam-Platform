import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { QuestionService } from '../../../core/services//question.service';
@Component({
  selector: 'app-question-crud',
  imports: [ReactiveFormsModule ],
  
  templateUrl: './question-crud.component.html',
  styleUrls: ['./question-crud.component.css']
})
export class QuestionCrudComponent {
  questionForm: FormGroup;
  isSubmitting = false;

  constructor(private fb: FormBuilder, private questionService: QuestionService) {
    this.questionForm = this.fb.group({
      question: ['', Validators.required],
      a: ['', Validators.required],
      b: ['', Validators.required],
      c: ['', Validators.required],
      d: ['', Validators.required],
      correctAnswer: ['', Validators.required],
      difficulty: [1]
    });
  }

  onSubmit() {
    if (this.questionForm.invalid) return;

    this.isSubmitting = true;

    const payload = {
      question: this.questionForm.value.question,
      choices: {
        a: this.questionForm.value.a,
        b: this.questionForm.value.b,
        c: this.questionForm.value.c,
        d: this.questionForm.value.d
      },
      correctAnswer: this.questionForm.value.correctAnswer,
      difficulty: this.questionForm.value.difficulty
    };

    // هنا تحطي الـ examId بتاع الامتحان اللي بتضيفي فيه السؤال
    const examId = 'EXAM_ID_HERE';

    this.questionService.createQuestion(examId, payload).subscribe({
      next: (res) => {
        alert('Question added successfully');
        this.questionForm.reset();
        this.isSubmitting = false;
      },
      error: (err) => {
        console.error(err);
        alert('Error adding question');
        this.isSubmitting = false;
      }
    });
  }
}
// ----------------------------------------------------------------------------------




// import { Component , OnInit} from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ReactiveFormsModule } from '@angular/forms';
// import { QuestionService } from '../../../core/services//question.service';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-question-crud',
//   standalone: true,
//   imports: [ReactiveFormsModule,CommonModule ],
//   templateUrl: './question-crud.component.html',
//   styleUrls: ['./question-crud.component.css'],
// })
// export class QuestionCrudComponent {
//   questions: any[] = [];
//   form: FormGroup;
//   isEditing: boolean = false;
//   editingQuestionId: string | null = null;

//   constructor(private questionService: QuestionService, private fb: FormBuilder) {
//     this.form = this.fb.group({
//       question: ['', Validators.required],
//       a: ['', Validators.required],
//       b: ['', Validators.required],
//       c: ['', Validators.required],
//       d: ['', Validators.required],
//       correctAnswer: ['', Validators.required],
//       difficulty: ['', [Validators.required, Validators.min(1), Validators.max(3)]],
//     });
//   }

//   ngOnInit(): void {
//     this.loadQuestions();
//   }

//   loadQuestions() {
//     this.questionService.getQuestions().subscribe({
//       next: (res) => (this.questions = res),
//       error: (err) => console.error(err),
//     });
//   }

//   onSubmit() {
//     const payload = {
//       question: this.form.value.question,
//       choices: {
//         a: this.form.value.a,
//         b: this.form.value.b,
//         c: this.form.value.c,
//         d: this.form.value.d,
//       },
//       correctAnswer: this.form.value.correctAnswer,
//       difficulty: this.form.value.difficulty,
//     };

//     if (this.isEditing && this.editingQuestionId) {
//       this.questionService.updateQuestion(this.editingQuestionId, payload).subscribe({
//         next: () => {
//           this.loadQuestions();
//           this.resetForm();
//         },
//       });
//     } else {
//       this.questionService.createQuestion(payload).subscribe({
//         next: () => {
//           this.loadQuestions();
//           this.resetForm();
//         },
//       });
//     }
//   }

//   editQuestion(q: any) {
//     this.form.patchValue({
//       question: q.question,
//       a: q.choices.a,
//       b: q.choices.b,
//       c: q.choices.c,
//       d: q.choices.d,
//       correctAnswer: q.correctAnswer,
//       difficulty: q.difficulty,
//     });
//     this.isEditing = true;
//     this.editingQuestionId = q._id;
//   }

//   deleteQuestion(id: string) {
//     this.questionService.deleteQuestion(id).subscribe({
//       next: () => this.loadQuestions(),
//     });
//   }

//   resetForm() {
//     this.form.reset();
//     this.isEditing = false;
//     this.editingQuestionId = null;
//   }
// }

