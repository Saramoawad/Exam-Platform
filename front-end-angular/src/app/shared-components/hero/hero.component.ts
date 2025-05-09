import { Component } from '@angular/core';
import { AnimationOptions,LottieComponent } from 'ngx-lottie';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [LottieComponent],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  lottieOptions: AnimationOptions = {
    path: 'lottieflow-cta-01-1-f89b09-linear.json',
    loop: true,
    autoplay: true
  };
}
