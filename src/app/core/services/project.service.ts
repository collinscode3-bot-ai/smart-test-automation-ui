import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projectsUrl = 'assets/projects.json';
  private selectedProjectSubject = new BehaviorSubject<Project | null>(null);
  selectedProject$ = this.selectedProjectSubject.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Fetches projects with optional pagination and search filtering.
   * @param page The page number to retrieve.
   * @param searchTerm The term to filter projects by.
   */
  getProjects(page: number = 1, searchTerm: string = ''): Observable<Project[]> {
    // TODO: API Call - Replace with actual backend integration
    return this.http.get<Project[]>(this.projectsUrl).pipe(
      map(projects => {
        let filtered = projects;
        if (searchTerm) {
          const term = searchTerm.toLowerCase();
          filtered = projects.filter(p =>
            p.title.toLowerCase().includes(term) ||
            p.description.toLowerCase().includes(term)
          );
        }

        // Simple client-side pagination for the placeholder
        const pageSize = 5;
        const start = (page - 1) * pageSize;
        return filtered.slice(start, start + pageSize);
      })
    );
  }

  selectProject(project: Project | null): void {
    this.selectedProjectSubject.next(project);
  }
}
