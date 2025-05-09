import { AuthService } from './../../../core/services/auth.service';
import { environment } from './../../../../environments/environment';
import { ExamService } from './../../../core/services/exam.service';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Exam } from '../../../core/models/exam.model';

@Component({
  selector: 'app-exam-crud',
  imports: [RouterLink],
  templateUrl: './exam-crud.component.html',
  styleUrl: './exam-crud.component.css',
})
export class ExamCrudComponent implements OnInit {
  constructor(
    private router: Router,
    private examService: ExamService,
    private authService: AuthService
  ) {}

  exams!: Exam[];

  apiUrl = environment.apiUrl;

  ngOnInit(): void {
    this.examService.getAllExams().subscribe({
      next: (response) => {
        this.exams = response.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  deleteExam(id: string) {
    this.examService.deleteExam(id).subscribe({
      next: (response) => {
        this.exams = this.exams.filter((exam) => exam._id !== id);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
