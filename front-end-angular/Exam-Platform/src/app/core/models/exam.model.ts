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
  questions: [
    {
      _id: string;
      question: string;
      choices: {
        a: string;
        b: string;
        c: string;
        d: string;
      };
      correctAnswer: string;
      difficulty: number;
      user: {
        _id: string;
        firstName: string;
        lastName: string;
        username: string;
        email: string;
      };
    }
  ];
  user?: {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
  };
}
