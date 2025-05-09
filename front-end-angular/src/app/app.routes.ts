import { adminGuard } from './core/guards/admin.guard';
import { Routes } from '@angular/router';
import { RegisterComponent } from './features/auth/register/register.component';
import { LoginComponent } from './features/auth/login/login.component';
import { ExamListComponent } from './features/student/exam-list/exam-list.component';
import { ExamCrudComponent } from './features/admin/exam-crud/exam-crud.component';
import { HomeComponent } from './features/home/home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AnotherLayoutComponent } from './layouts/another-layout/another-layout.component';
import { AddExamComponent } from './features/admin/add-exam/add-exam.component';
import { EditExamComponent } from './features/admin/edit-exam/edit-exam.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { SubmitExamComponent } from './features/student/submit-exam/submit-exam.component';
import { ViewResultComponent } from './features/student/view-result/view-result.component';
import { QuestionCrudComponent } from './features/admin/question-crud/question-crud.component';
import { StudentsResultsComponent } from './features/admin/students-results/students-results.component';
import { authGuard } from './core/guards/auth.guard';
import { userGuard } from './core/guards/user.guard';
import { TakeExamComponent } from './features/student/take-exam/take-exam.component';
import { ExamDetailsComponent } from './features/admin/exam-details/exam-details.component';
import { EditQuestionComponent } from './features/admin/question-crud/edit-question/edit-question.component';
import { AddQuestionComponent } from './features/admin/question-crud/add-question/add-question.component';
import { ViewAllResultsComponent } from './features/student/view-all-results/view-all-results.component';
export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      {
        path: 'student',
        children: [
          {
            path: 'exam',
            component: ExamListComponent,
            canActivate: [authGuard, userGuard],
          },
          {
            path: 'take-exam/:id',
            component: TakeExamComponent,
            canActivate: [authGuard, userGuard],
          },
          {
            path: 'submit-exam/:id',
            component: SubmitExamComponent,
            canActivate: [authGuard, userGuard],
          },
          {
            path: 'view-all-results',
            component:ViewAllResultsComponent ,
            canActivate: [authGuard, userGuard]
          },
          {
            path: 'view-result/:id',
            component: ViewResultComponent,
            canActivate: [authGuard, userGuard],
          },
        ],
      },
      {
        path: 'teacher',
        children: [
          {
            path: 'exam',
            component: ExamCrudComponent,
            canActivate: [authGuard, adminGuard],
          },
          {
            path: 'exam/:id',
            component: ExamDetailsComponent,
            canActivate: [authGuard, adminGuard],
          },
          {
            path: 'add-exam',
            component: AddExamComponent,
            canActivate: [authGuard, adminGuard],
          },
          {
            path: 'edit-exam/:id',
            component: EditExamComponent,
            canActivate: [authGuard, adminGuard],
          },
          {
            path: 'edit-question/:id',
            component: EditQuestionComponent,
            canActivate: [authGuard, adminGuard],
          },
          {
            path: 'add-question/:examId',
            component: AddQuestionComponent,
            canActivate: [authGuard, adminGuard],
          },
          {
            path: 'question-crud',
            component: QuestionCrudComponent,
            canActivate: [authGuard, adminGuard],
          },
          {
            path: 'students-results',
            component: StudentsResultsComponent,
            canActivate: [authGuard, adminGuard],
          },
          
        ],
      },
    ],
  },
  {
    path: '',
    component: AnotherLayoutComponent,
    children: [
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
    ],
  },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: '**', component: NotFoundComponent },
];
