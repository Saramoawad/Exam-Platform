import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Result } from '../models/result.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ResultService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8000/results';

  getAllResults(): Observable<Result[]> {
    return this.http
      .get<{ status: string; results: number; data: Result[] }>(this.baseUrl)
      .pipe(map((res) => res.data));
  }

  getStudentResults(): Observable<Result[]> {
    return this.http
      .get<{ status: string; results: number; data: Result[] }>(
        `${this.baseUrl}/my-results`
      )
      .pipe(map((res) => res.data));
  }

  getResultById(id: string): Observable<Result> {
    return this.http
      .get<{ status: string; data: Result }>(`${this.baseUrl}/${id}`)
      .pipe(map((res) => res.data));
  }

  deleteResult(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  submitExam(
    examId: string,
    body: { answers: { questionId: string; answer: string }[] }
  ): Observable<{
    status: string;
    data: { message: string; submissionId: string };
  }> {
    return this.http.post<{
      status: string;
      data: { message: string; submissionId: string };
    }>(`${this.baseUrl}/submit/${examId}`, body);
  }

  getMyResults(): Observable<Result[]> {
    return this.http.get<Result[]>(`${this.baseUrl}/my-results`);
  }
}
