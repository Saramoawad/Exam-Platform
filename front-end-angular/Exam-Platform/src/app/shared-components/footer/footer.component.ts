import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
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
