import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ExamService } from '../../../core/services/exam.service';
import { environment } from '../../../../environments/environment';
import { Exam } from '../../../core/models/exam.model';

@Component({
  selector: 'app-exam-list',
  imports: [RouterLink],
  templateUrl: './exam-list.component.html',
  styleUrl: './exam-list.component.css'
})
export class ExamListComponent {
  constructor(private router: Router, private examService: ExamService) {}

  exams!: Exam[];

  apiUrl = environment.apiUrl


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

}
