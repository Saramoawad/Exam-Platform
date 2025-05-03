import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClientComponent } from './features/home/client/client.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ClientComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Exam-Platform';
}
