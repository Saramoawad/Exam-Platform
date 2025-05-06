import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ExamService } from '../../../core/services/exam.service';
import { Exam } from '../../../core/models/exam.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-exam',
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './add-exam.component.html',
  styleUrl: './add-exam.component.css',
})
export class AddExamComponent {
  constructor(private router: Router, private examService: ExamService) {}

  formNotValid: boolean = false;
  
  wrong: string = ''

  emailSymbol = '@';

  examForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    subject: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    image: new FormControl(''),
    totalMarks: new FormControl(100, [Validators.required, Validators.min(1)]),
    passingMarks: new FormControl(60, [Validators.required, Validators.min(0)]),
    level: new FormControl('', [Validators.required]),
    duration: new FormControl(60, [Validators.required, Validators.min(1)]),
    stageLevel: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    this.examForm.markAllAsTouched();
    if (this.examForm.valid) {
      this.formNotValid = false;
      this.examService
        .addExam(this.examForm.value as { status: string; data: Exam })
        .subscribe({
          next: (response) => {
            this.router.navigate(['/teacher/exam']);
          },
          error: (error) => {
            this.wrong = error.error.message
            console.log(error);
          },
        });
    } else {
      this.formNotValid = true;
    }
  }
}
