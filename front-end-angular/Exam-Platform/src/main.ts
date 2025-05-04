// import { bootstrapApplication } from '@angular/platform-browser';
// import { provideAnimations } from '@angular/platform-browser/animations';
// import { provideLottieOptions } from 'ngx-lottie';

// import player from 'lottie-web';
// import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
// import { importProvidersFrom } from '@angular/core';
// import { ReactiveFormsModule } from '@angular/forms';
// import { QuestionService } from './app/core/services/question.service';
// import { AppComponent } from './app/app.component';
// import { provideRouter } from '@angular/router';
// import { routes } from './app/app.routes';
// import { FormsModule } from '@angular/forms';
// bootstrapApplication(AppComponent, {
//   providers: [
//     provideAnimations(),
//     provideLottieOptions({ player: () => player }),
//     provideHttpClient(withInterceptorsFromDi()),
//     importProvidersFrom(ReactiveFormsModule),
//     { provide: QuestionService, useClass: QuestionService },
//     provideRouter( routes ),
//     provideHttpClient(),
    
//   ]
// });



import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideLottieOptions } from 'ngx-lottie';
import player from 'lottie-web';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideLottieOptions({ player: () => player }),
    provideHttpClient(withInterceptorsFromDi()), 
    provideRouter(routes),
    importProvidersFrom(ReactiveFormsModule, FormsModule), 
  ]
}).catch(err => console.error(err));
