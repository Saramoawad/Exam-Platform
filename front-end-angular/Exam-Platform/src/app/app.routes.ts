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

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'student/exams', component: ExamListComponent },
      { path: 'teacher/exams', component: ExamCrudComponent },
      { path: 'teacher/exams/add', component: AddExamComponent },
      { path: 'teacher/exams/edit/:id', component: EditExamComponent },
    ],
  },
  {
    path: '',
    component: AnotherLayoutComponent,
    children: [
      { path: 'auth', redirectTo: 'auth/login', pathMatch: 'full' },
      { path: 'auth/register', component: RegisterComponent },
      { path: 'auth/login', component: LoginComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
];

// { path: '', redirectTo: 'home', pathMatch: 'full'},
// {path: 'home', component: HomeComponent},
// { path: 'auth/register', component: RegisterComponent },
// { path: 'auth/login', component: LoginComponent },
// { path: 'student/exams', component: ExamListComponent },
// { path: 'teacher/exams', component: ExamCrudComponent },
// { path: '**', component: NotFoundComponent },
