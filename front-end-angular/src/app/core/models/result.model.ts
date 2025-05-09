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
  studentId: {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
  };
  examId: Exam;
  score: number;
  passed: boolean;
  answers: Answer[];
  createdAt: string;
  updatedAt: string;
}
