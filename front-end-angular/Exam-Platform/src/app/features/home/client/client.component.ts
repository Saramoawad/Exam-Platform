import { Component } from '@angular/core';

@Component({
  selector: 'app-client',
  imports: [],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css',
})
export class ClientComponent {
  sections: {
    image: string;
    name: string;
    position: string;
    details: string;
  }[] = [
    {
      image: 'person1.png',
      name: 'James Hown',
      position: 'Sub Teacher in Taxes',
      details:
        'Schools and districts save time and money, so they can focus on full-time staff, the outcomes. Subs work on their own terms while making a difference in students’ lives. The Swing platform makes it easy for administrators to request subs.',
    },
    {
      image: 'person2.png',
      name: 'Wade Warren',
      position: 'Sub Teacher in NY',
      details:
        'Manageable learning while working. Time well spent when moving or waiting. Although the microlearning method is not for me, the entire program was compiled in an understandable and clear way, allowing me to grasp key concepts.',
    },
    {
      image: 'person3.png',
      name: 'Jenny Wilson',
      position: 'Sub Teacher in Illinois',
      details:
        'It is a well taught by lecturers from other universities as well, a great online university for people who work full time. The amount of time to spend is 15 minutes, but you will get an astonishing amount of books to read.',
    },
  ];
}
