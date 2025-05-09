import { Question } from './../../../core/models/question.model';
import { QuestionService } from './../../../core/services/question.service';
import { environment } from './../../../../environments/environment';
import { ExamService } from './../../../core/services/exam.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Exam } from '../../../core/models/exam.model';

@Component({
  selector: 'app-exam-details',
  imports: [RouterLink],
  templateUrl: './exam-details.component.html',
  styleUrl: './exam-details.component.css',
})
export class ExamDetailsComponent implements OnInit {
  constructor(
    private router: Router,
    private examService: ExamService,
    private activatedRoute: ActivatedRoute,
    private questionService: QuestionService
  ) {}

  exam!: Exam;
  examId!: string;

  apiUrl = environment.apiUrl;

  ngOnInit(): void {
    this.examId = this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.examService.getExamById(this.examId).subscribe({
      next: (response) => {
        
        console.log(response.data)
        this.exam = response.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  deleteQuestion(id: string) {
    this.questionService.deleteQuestion(id).subscribe({
      next: (response: any) => {
        if (this.exam.questions) {
          this.exam.questions = this.exam.questions.filter(
            (question) => question._id !== id
          );
        }
        console.log('deleted successfully');
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  deleteExam(id: string) {
    this.examService.deleteExam(id).subscribe({
      next: (response) => {
        this.router.navigate(['/teacher/exam']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
