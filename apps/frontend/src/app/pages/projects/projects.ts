import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectsService } from '../../core/services/projects.service';
import { ProjectCard } from './components/project-card/project-card';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, FormsModule, ProjectCard],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects implements OnInit {
  projectsService = inject(ProjectsService);

  showFeatured = signal(false);
  showPublished = signal(true);

  // Expose signals directly from service for template to read
  projects = this.projectsService.projects;
  isLoading = this.projectsService.isLoading;
  error = this.projectsService.error;

  ngOnInit() {
    this.loadData();
  }

  onFilterChange() {
    this.loadData();
  }

  private loadData() {
    this.projectsService.fetchProjects({
      featured: this.showFeatured() ? true : undefined,
      published: this.showPublished(),
    });
  }
}
