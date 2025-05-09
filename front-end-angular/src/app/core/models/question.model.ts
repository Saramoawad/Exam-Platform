export interface Question {
  _id: string;
  question: string;
  choices: {
    a: string;
    b: string;
    c: string;
    d: string;
  };
  correctAnswer: string;
  difficulty?: number;
  exam: {
    _id: string;
    name: string;
  };
  user?: {
    _id?: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
  };
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}
