import { Component } from '@angular/core';
import { ContactComponent } from '../contact/contact.component';
import { ClientComponent } from '../client/client.component';

@Component({
  selector: 'app-home',
  imports: [ContactComponent, ClientComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
