import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-result',
  standalone: true,
  imports: [],
  templateUrl: './view-result.component.html',
  styleUrls: ['./view-result.component.css']
})
export class ViewResultComponent implements OnInit {
  result: any = {};

  ngOnInit(): void {
    this.result = {
      examTitle: 'Math Exam',
      score: 85,
      total: 100,
      passed: true
    };
  }
}

