import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { ExamListComponent } from './features/student/exam-list/exam-list.component';
import { TakeExamComponent } from './features/student/take-exam/take-exam.component';
import { SubmitExamComponent } from './features/student/submit-exam/submit-exam.component';
import { ViewResultComponent } from './features/student/view-result/view-result.component';
import { QuestionCrudComponent } from './features/admin/question-crud/question-crud.component';
import { StudentsResultsComponent } from './features/admin/students-results/students-results.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'student',
    children: [
      { path: 'exam-list', component: ExamListComponent },
      { path: 'take-exam/:examId', component: TakeExamComponent },
      { path: 'submit-exam/:examId', component: SubmitExamComponent },
      { path: 'view-result', component: ViewResultComponent }
    ]
  },
  {
    path: 'admin',
    children: [
      { path: 'question-crud', component: QuestionCrudComponent },
      { path: 'students-results', component: StudentsResultsComponent }
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }    
];