import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Welcome to Angular 16';
  course: string = 'Course of Angular 16';
  teacher: string = 'Juan Manuel Treviranus';
}
