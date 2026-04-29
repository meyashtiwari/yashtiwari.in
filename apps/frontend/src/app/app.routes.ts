import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./pages/projects/projects').then(
        (m) => m.Projects,
      ),
  },
  {
    path: 'projects/:id',
    loadComponent: () =>
      import('./pages/projects/project-detail/project-detail').then(
        (m) => m.ProjectDetail,
      ),
  },
  {
    path: 'blog',
    loadComponent: () =>
      import('./pages/blog/blog').then((m) => m.Blog),
  },
  {
    path: 'journey',
    loadComponent: () =>
      import('./pages/journey/journey').then(
        (m) => m.Journey,
      ),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact').then(
        (m) => m.Contact,
      ),
  },
];
