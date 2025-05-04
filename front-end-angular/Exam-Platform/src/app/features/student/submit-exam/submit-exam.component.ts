import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-submit-exam',
  standalone: true,
  imports: [],
  templateUrl: './submit-exam.component.html',
  styleUrls: ['./submit-exam.component.css']
})
export class SubmitExamComponent implements OnInit {
  examId: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.examId = this.route.snapshot.paramMap.get('examId') || '';
  }

  goToResults(): void {
    this.router.navigate(['/student/view-result']);
  }
}
