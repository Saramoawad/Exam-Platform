export interface Question {
    _id: string;
    question: string;
    choices: {
      a: string;
      b: string;
      c: string;
      d: string;
    };
    correctAnswer: 'a' | 'b' | 'c' | 'd';
    difficulty?: number;
    marks: number;
    exam: string;
    user: string;
  }