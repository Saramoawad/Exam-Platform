import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exam } from '../models/exam.model';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  examUrl = 'http://localhost:8000/exams';

  constructor(private http: HttpClient) {}

  getAllExams(): Observable<{ status: string; data: Exam[] }> {
    return this.http.get<{ status: string; data: Exam[] }>(this.examUrl);
  }

  getExamById(examId: string): Observable<{ status: string; data: Exam }> {
    return this.http.get<{ status: string; data: Exam }>(
      `${this.examUrl}/${examId}`
    );
  }

  addExam(formData: FormData): Observable<{ status: string; data: Exam }> {
    return this.http.post<{ status: string; data: Exam }>(this.examUrl, formData);
  }

  editExam(examId: string, formData: FormData) {
    return this.http.patch(`${this.examUrl}/${examId}`, formData);
  }

  deleteExam(examId: string) {
    return this.http.delete(`${this.examUrl}/${examId}`);
  }
}
