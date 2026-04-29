import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project } from 'shared-types';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css',
})
export class ProjectCard {
  // input() — declares a property that the parent passes in
  project = input.required<Project>(); // required means parent MUST pass this
}
