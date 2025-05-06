import { UserRegister } from './user.model';
import { Exam } from './exam.model';
import { Question } from './question.model';

export interface Answer {
  questionId: Question | string;
  selectedAnswer: string;
  correctAnswer: string;
  marks: number;
}

export interface Result {
  _id: string;
  studentId: UserRegister | string;
  examId: Exam | string;
  score: number;
  passed: boolean;
  answers: Answer[];
  createdAt: string;
  updatedAt: string;
}
