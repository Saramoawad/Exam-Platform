import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-students-results',
  standalone: true,
  imports: [],
  templateUrl: './students-results.component.html',
  styleUrls: ['./students-results.component.css']
})
export class StudentsResultsComponent implements OnInit {
  results: any[] = [];

  ngOnInit(): void {
    this.results = [
      { studentId: 'student1', examTitle: 'Math Exam', score: 85, total: 100 },
      { studentId: 'student2', examTitle: 'Science Exam', score: 70, total: 100 }
    ];
  }
}
