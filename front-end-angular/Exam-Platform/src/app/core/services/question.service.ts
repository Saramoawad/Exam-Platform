import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private baseUrl = 'http://localhost:3000/api/questions';

  constructor(private http: HttpClient) {}

  createQuestion(examId: string, questionData: any) {
    return this.http.post(`${this.baseUrl}/${examId}`, questionData);
  }
}
