import { Component } from '@angular/core';
import { ContactComponent } from '../contact/contact.component';
import { ClientComponent } from '../client/client.component';
import { HeroComponent } from '../../../shared-components/hero/hero.component';
import { AboutComponent } from '../about/about.component';
@Component({
  selector: 'app-home',
  imports: [ContactComponent, ClientComponent,HeroComponent, AboutComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
