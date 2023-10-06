import { Component } from '@angular/core';

@Component({
  selector: 'app-directives',
  templateUrl: './directives.component.html'
  // styleUrls: ['./directives.component.css']
})
export class DirectivesComponent {
  courseList: string [] = ['TypeScript', 'JavaScript', 'Java SE', 'C#', 'PHP'];
  showCourses: boolean = true;

  setShowCourses(): void {
    this.showCourses = (this.showCourses==true)? false: true;
  }

}
