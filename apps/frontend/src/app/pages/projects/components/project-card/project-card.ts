import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project } from 'shared-types';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss',
})
export class ProjectCardComponent {
  // input() — declares a property that the parent passes in
  project = input.required<Project>(); // required means parent MUST pass this
}
