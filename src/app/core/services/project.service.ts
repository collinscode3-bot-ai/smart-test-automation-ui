import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projectsUrl = 'assets/projects.json';
  private selectedProjectSubject = new BehaviorSubject<Project | null>(null);
  selectedProject$ = this.selectedProjectSubject.asObservable();

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectsUrl);
  }

  selectProject(project: Project | null): void {
    this.selectedProjectSubject.next(project);
  }
}
