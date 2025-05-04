import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-take-exam',
  standalone: true,
  imports: [],
  templateUrl: './take-exam.component.html',
  styleUrls: ['./take-exam.component.css']
})
export class TakeExamComponent implements OnInit {
  examId: string = '';
  questions: any[] = [];
  selectedAnswers: { [key: string]: string } = {};    

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.examId = this.route.snapshot.paramMap.get('examId') || '';

    this.questions = [
      {
        _id: '1',
        text: 'What is the capital of France?',
        options: ['Paris', 'London', 'Berlin', 'Madrid'],
        correctAnswer: 'Paris'
      },
      {
        _id: '2',
        text: 'What is 2 + 2?',
        options: ['3', '4', '5', '6'],
        correctAnswer: '4'
      }
    ];
  }

  onAnswerSelect(questionId: string, selectedOption: string): void {
    this.selectedAnswers[questionId] = selectedOption;
  }

  onSubmit(): void {
    console.log('Selected Answers:', this.selectedAnswers);
  }
}