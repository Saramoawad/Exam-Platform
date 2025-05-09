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
  wrong: string = '';
  emailSymbol = '@';
  selectedFile: File | null = null;

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
    image: new FormControl(null),
    totalMarks: new FormControl(100, [Validators.required, Validators.min(1)]),
    passingMarks: new FormControl(60, [Validators.required, Validators.min(0)]),
    level: new FormControl('', [Validators.required]),
    duration: new FormControl(60, [Validators.required, Validators.min(1)]),
    stageLevel: new FormControl('', [Validators.required]),
  });

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    // fileInput.files >> in not null or undefined >> file was selected
    // fileInput.files.length > 0 : there's at least one file selected
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
    }
  }

  onSubmit() {
    this.examForm.markAllAsTouched();

    if (this.examForm.invalid) {
      this.formNotValid = true;
      return;
    }

    this.formNotValid = false;

    const formData = new FormData();
    const values: any = this.examForm.value;

    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('subject', values.subject);
    formData.append('totalMarks', values.totalMarks.toString());
    formData.append('passingMarks', values.passingMarks.toString());
    formData.append('level', values.level);
    formData.append('duration', values.duration.toString());
    formData.append('stageLevel', values.stageLevel);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.examService
      .addExam(formData)
      .subscribe({
        next: (response) => {
          this.router.navigate(['/teacher/exam']);
        },
        error: (error) => {
          this.wrong = error.error.message;
          console.log(error);
        },
      });
  }
}
