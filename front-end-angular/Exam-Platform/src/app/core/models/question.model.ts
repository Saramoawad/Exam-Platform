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
    marks?: number;
    exam?: {
      _id?: string;
      title?: string;
    };
    user?: {
      _id?: string;
      name?: string;
    };
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
  }