import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProjectsService } from '../../../core/services/projects.service';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss',
})
export class ProjectDetailComponent implements OnInit {
  private route = inject(ActivatedRoute); // gives access to current route info
  private projectsService = inject(ProjectsService);

  project = this.projectsService.selectedProject;
  isLoading = this.projectsService.isLoading;
  error = this.projectsService.error;

  ngOnInit() {
    // Read the :id from the URL
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.projectsService.fetchProjectById(id);
    }
  }
}
