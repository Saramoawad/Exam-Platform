import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Result } from '../models/result.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ResultService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/results';

  getAllResults(): Observable<Result[]> {
    return this.http.get<Result[]>(this.baseUrl);
  }

  getStudentResults(): Observable<Result[]> {
    return this.http.get<Result[]>(`${this.baseUrl}/my-results`);
  }

  getResultById(id: string): Observable<Result> {
    return this.http.get<Result>(`${this.baseUrl}/${id}`);
  }

  deleteResult(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getMyResults(): Observable<Result[]> {
    return this.http.get<{ data: Result[] }>('/results/my-results').pipe(
      map(res => res.data)
    );
  }
}