import { Component, OnInit, inject } from '@angular/core';
import { ProjectsService } from '../../core/services/projects.service';
import { ProjectCardComponent } from './components/project-card/project-card';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ProjectCardComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements OnInit {
  projectsService = inject(ProjectsService);

  // Expose signals directly from service for template to read
  projects = this.projectsService.projects;
  isLoading = this.projectsService.isLoading;
  error = this.projectsService.error;

  ngOnInit() {
    // Lifecycle hook — runs once when component is created
    // Equivalent to mounted() in Vue or componentDidMount in React
    this.projectsService.fetchProjects();
  }
}
