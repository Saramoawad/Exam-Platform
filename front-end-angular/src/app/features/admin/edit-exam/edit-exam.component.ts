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
  originalValues: any;
  examForm: FormGroup;
  formNotValid: boolean = false;
  examId!: string;
  existingImageUrl?: string;
  apiUrl = environment.apiUrl;
  wrong: string = '';
  selectedFile: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private examService: ExamService
  ) {
    this.examForm = new FormGroup({
      name: new FormControl('', [Validators.minLength(3), Validators.required]),
      description: new FormControl('', [
        Validators.minLength(5),
        Validators.required,
      ]),
      subject: new FormControl('', [
        Validators.minLength(3),
        Validators.required,
      ]),
      image: new FormControl(null),
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
          console.log(response.data);
          this.originalValues = {
            name: response.data.name || '',
            description: response.data.description || '',
            subject: response.data.subject || '',
            totalMarks: response.data.totalMarks || 100,
            passingMarks: response.data.passingMarks || 60,
            level: response.data.level || '',
            duration: response.data.duration || 60,
            stageLevel: response.data.stageLevel || '',
          };
          this.examForm.patchValue(this.originalValues);
        },
        error: (err) => {
          console.error('Failed to fetch exam:', err);
        },
      });
    }
  }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
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
    const values = this.examForm.value;

    // It checks whether any value in the values object is different from the current form values in this.examForm.
    // If even one field has changed, hasChanges will be true.
    // .some() is an array method that returns true if at least one element in the array passes the given test.
    // For each key, it's comparing:
    // values[key]: the value passed in or stored earlier (e.g., old data)
    // this.examForm.getRawValue()[key]: the current value of that field in the form (including disabled fields)
    // getRawValue() returns all form values, including fields that are disabled.
    const hasChanges = Object.keys(values).some((key) => {
      console.log(`${values[key]} COMPAREWITH ${this.originalValues[key]}`);
      return values[key] !== this.originalValues[key];
    });

    console.log(hasChanges);

    if (!hasChanges && !this.selectedFile) {
      console.log('no changes made for exam');
      this.router.navigate(['/teacher/exam']);
      return;
    }

    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('subject', values.subject);
    formData.append('totalMarks', values.totalMarks?.toString() || '100');
    formData.append('passingMarks', values.passingMarks?.toString() || '60');
    formData.append('level', values.level);
    formData.append('duration', values.duration?.toString() || '60');
    formData.append('stageLevel', values.stageLevel);

    if (this.selectedFile) {
      console.log(`found new image`)
      console.log(this.selectedFile)
      console.log(`old image ${this.existingImageUrl}`)
      formData.append('image', this.selectedFile);
    } else {
      console.log("no new image")
      console.log(`old image ${this.existingImageUrl}`)
      formData.append('image', this.existingImageUrl || '');
    }

    this.examService.editExam(this.examId, formData).subscribe({
      next: () => {
        this.router.navigate(['/teacher/exam']);
      },
      error: (error) => {
        this.wrong = error.error.message;
        console.error(error);
      },
    });
  }
}
