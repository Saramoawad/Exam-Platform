import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ExamService } from '../../../core/services/exam.service';
import { NgIf } from '@angular/common';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-edit-exam',
  templateUrl: './edit-exam.component.html',
  imports: [NgIf, ReactiveFormsModule],
  styleUrls: ['./edit-exam.component.css'],
})
export class EditExamComponent implements OnInit {
  examForm: FormGroup;
  formNotValid: boolean = false;
  examId!: string;
  existingImageUrl?: string;
  apiUrl = environment.apiUrl;
  wrong: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private examService: ExamService
  ) {
    this.examForm = new FormGroup({
      name: new FormControl('', [Validators.minLength(3), Validators.required]),
      description: new FormControl('', [Validators.minLength(5), Validators.required]),
      subject: new FormControl('', [Validators.minLength(3), Validators.required]),
      image: new FormControl(''),
      totalMarks: new FormControl(100, [Validators.min(1)]),
      passingMarks: new FormControl(60, [Validators.min(0)]),
      level: new FormControl('', [Validators.required]),
      duration: new FormControl(60, [Validators.min(1)]),
      stageLevel: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.examId = this.route.snapshot.paramMap.get('id') || '';
    if (this.examId) {
      this.examService.getExamById(this.examId).subscribe({
        next: (response) => {
          this.existingImageUrl = response.data.image;
          console.log(`${this.apiUrl}${response.data.image}`);
          console.log(`${response.data.image}`);
          console.log(response.data);
          this.examForm.patchValue({
            name: response.data.name || '',
            description: response.data.description || '',
            subject: response.data.subject || '',
            // image: response.data.image || '',
            totalMarks: response.data.totalMarks || 100,
            passingMarks: response.data.passingMarks || 60,
            level: response.data.level || '',
            duration: response.data.duration || 60,
            stageLevel: response.data.stageLevel || '',
          });
        },
        error: (err) => {
          console.error('Failed to fetch exam:', err);
        },
      });
    }
  }

  onSubmit() {
    this.examForm.markAllAsTouched();
    if (this.examForm.valid) {
      this.formNotValid = false;
      this.examService.editExam(this.examId, this.examForm.value).subscribe({
        next: () => {
          this.router.navigate(['/teacher/exam']);
        },
        error: (error) => {
          this.wrong = error.error.message;
          console.error(error);
        },
      });
    } else {
      this.formNotValid = true;
    }
  }
}
