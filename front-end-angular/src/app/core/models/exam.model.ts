import { Question } from './question.model';

export interface Exam {
  name: string;
  description: string;
  subject: string;
  image?: string;
  totalMarks?: number;
  passingMarks?: number;
  level: string;
  duration?: number;
  stageLevel: string;
  _id: string;
  questions?: Question[];
  user?: {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
  };
}
