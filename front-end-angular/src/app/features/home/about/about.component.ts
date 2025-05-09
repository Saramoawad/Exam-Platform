import { Component } from '@angular/core';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';

@Component({
  selector: 'app-about',
  imports: [ LottieComponent ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  lottieOptions: AnimationOptions = {
    path: 'lottieflow-background-07-2d7d76-linear.json',
    loop: true,
    autoplay: true,
    renderer: 'svg',
  };
}
