import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./shared-components/navbar/navbar.component";
import { HeroComponent } from './shared-components/hero/hero.component';
import { AboutComponent } from './features/home/about/about.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent,HeroComponent, AboutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Exam-Platform';
}
