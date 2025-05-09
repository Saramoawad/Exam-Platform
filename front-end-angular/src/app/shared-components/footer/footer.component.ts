import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  socialArray: string[] = [
    '<i class="fa-brands fa-facebook-f fs-4 text-white position-absolute"></i>',
    '<i class="fa-brands fa-instagram fs-4 text-white position-absolute"></i>',
    '<i class="fa-brands fa-twitter fs-4 text-white position-absolute"></i>',
  ];
}
