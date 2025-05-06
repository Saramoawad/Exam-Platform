import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8000';

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    console.log('Token from localStorage:', token);
    if (!token) {
      console.warn('No token found in localStorage! Request may fail.');
      return new HttpHeaders();
    }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getQuestions(examId: string): Observable<{ status: string, results: number, data: Question[] }> {
    console.log('Sending request to:', `${this.apiUrl}/questions?examId=${examId}`);
    return this.http.get<{ status: string, results: number, data: Question[] }>(`${this.apiUrl}/questions?examId=${examId}`, {
      headers: this.getHeaders()
    });
  }

  getAllQuestions(): Observable<{ status: string, results: number, data: Question[] }> {
    return this.http.get<{ status: string, results: number, data: Question[] }>(`${this.apiUrl}/questions`, {
      headers: this.getHeaders()
    });
  }

  getQuestion(id: string): Observable<{ status: string, data: Question }> {
    return this.http.get<{ status: string, data: Question }>(`${this.apiUrl}/questions/${id}`, {
      headers: this.getHeaders()
    });
  }

  createQuestion(question: Partial<Question>): Observable<{ status: string, data: Question }> {
    return this.http.post<{ status: string, data: Question }>(`${this.apiUrl}/questions`, question, {
      headers: this.getHeaders()
    });
  }

  updateQuestion(id: string, question: Partial<Question>): Observable<{ status: string, data: Question }> {
    return this.http.patch<{ status: string, data: Question }>(`${this.apiUrl}/questions/${id}`, question, {
      headers: this.getHeaders()
    });
  }

  deleteQuestion(id: string): Observable<{ status: string, data: null }> {
    return this.http.delete<{ status: string, data: null }>(`${this.apiUrl}/questions/${id}`, {
      headers: this.getHeaders()
    });
  }

  submitExam(examId: string, answers: { questionId: string, answer: string }[]): Observable<{ status: string, data: { message: string, submissionId: string } }> {
    return this.http.post<{ status: string, data: { message: string, submissionId: string } }>(
      `${this.apiUrl}/${examId}/submit`,
      { answers },
      { headers: this.getHeaders() }
    );
  }
}