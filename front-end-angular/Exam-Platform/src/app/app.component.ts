import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClientComponent } from './features/home/client/client.component';
import { FooterComponent } from './shared-components/footer/footer.component';
import { ContactComponent } from './features/home/contact/contact.component';
import { NavbarComponent } from './shared-components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ClientComponent, FooterComponent, ContactComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Exam-Platform';
}
