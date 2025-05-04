import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { NavbarComponent } from "./shared-components/navbar/navbar.component";
// import { HeroComponent } from './shared-components/hero/hero.component';
// import { AboutComponent } from './features/home/about/about.component';
// import { QuestionCrudComponent } from './features/admin/question-crud/question-crud.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Exam-Platform';
}
