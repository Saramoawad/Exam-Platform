import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000';

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getQuestions(): Observable<{ results: number, data: Question[] }> {
    return this.http.get<{ results: number, data: Question[] }>(`${this.apiUrl}/questions`, {
      headers: this.getHeaders()
    });
  }

  createQuestion(examId: string, question: Partial<Question>): Observable<Question> {
    return this.http.post<Question>(`${this.apiUrl}/api/admin/exams/${examId}/questions`, question, {
      headers: this.getHeaders()
    });
  }

  updateQuestion(examId: string, questionId: string, question: Partial<Question>): Observable<Question> {
    return this.http.patch<Question>(`${this.apiUrl}/api/admin/exams/${examId}/questions/${questionId}`, question, {
      headers: this.getHeaders()
    });
  }

  deleteQuestion(examId: string, questionId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/api/admin/exams/${examId}/questions/${questionId}`, {
      headers: this.getHeaders()
    });
  }
}