import { Injectable, signal, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Project } from 'shared-types';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/projects`;

  // Signals for state management
  projects = signal<Project[]>([]);
  selectedProject = signal<Project | null>(null);
  isLoading = signal(false);
  error = signal<string | null>(null);

  // Fetch all published projects
  fetchProjects(filters?: { featured?: boolean; published?: boolean }) {
    this.isLoading.set(true);
    this.error.set(null);

    let params = new HttpParams();
    if (filters?.featured) {
      params = params.set('featured', 'true');
    }
    if (filters?.published !== undefined) {
      params = params.set('published', filters.published ? 'true' : 'false');
    } else {
      // fetch published projects By default
      params = params.set('published', 'true');
    }

    this.http.get<Project[]>(`${this.baseUrl}`, { params }).subscribe({
      next: (data) => {
        this.projects.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load projects. Please try again.');
        this.isLoading.set(false);
        console.error(err);
      },
    });
  }

  // Fetch single project by id
  fetchProjectById(id: string) {
    this.isLoading.set(true);
    this.error.set(null);
    this.selectedProject.set(null);

    this.http.get<Project>(`${this.baseUrl}/${id}`).subscribe({
      next: (data) => {
        this.selectedProject.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('Project not found.');
        this.isLoading.set(false);
        console.error(err);
      },
    });
  }
}
