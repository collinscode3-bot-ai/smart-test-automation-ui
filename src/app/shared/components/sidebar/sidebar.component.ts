import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../core/services/project.service';
import { Project } from '../../../core/models/project.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  template: `
    <aside class="sidebar">
      <div class="sidebar-header">
        <h3 class="sidebar-title">RECENT PROJECTS</h3>
        <a href="javascript:void(0)" class="view-all" (click)="onNewProject()">+ New</a>
      </div>
      <div class="project-list">
        <div *ngFor="let project of projects$ | async"
             class="project-item"
             (click)="onProjectClick(project)">
          <div class="icon-box" [ngClass]="project.color || 'purple'">
            <ng-container [ngSwitch]="project.color">
              <svg *ngSwitchCase="'green'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="m9 15 2 2 4-4"/></svg>
              <svg *ngSwitchCase="'yellow'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 21 3-3 8.82-8.82L10 4.36 1.18 13.18 4 16l-1 5Zm15-18 3 3-3 3-3-3 3-3Z"/></svg>
              <svg *ngSwitchDefault xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/></svg>
            </ng-container>
          </div>
          <span class="project-name">{{ project.name }}</span>
        </div>
      </div>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: 300px;
    }
    .sidebar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    .sidebar-title {
      font-size: 14px;
      font-weight: 700;
      color: var(--link-color);
      letter-spacing: 0.5px;
    }
    .view-all {
      font-size: 14px;
      font-weight: 600;
      color: var(--link-color);
    }
    .project-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .project-item {
      background: var(--card-bg);
      padding: 16px 20px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      gap: 16px;
      box-shadow: var(--shadow-sm);
      cursor: pointer;
      transition: transform 0.2s;
      &:hover {
        transform: translateY(-2px);
      }
    }
    .icon-box {
      width: 36px;
      height: 36px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      &.purple { background-color: #F5F3FF; color: #7C3AED; }
      &.green { background-color: #ECFDF5; color: #10B981; }
      &.yellow { background-color: #FFFBEB; color: #F59E0B; }
    }
    .project-name {
      font-size: 15px;
      font-weight: 500;
      color: var(--text-primary);
    }
  `]
})
export class SidebarComponent implements OnInit {
  projects$: Observable<Project[]>;

  constructor(private projectService: ProjectService) {
    this.projects$ = this.projectService.getProjects();
  }

  ngOnInit(): void {}

  onProjectClick(project: Project): void {
    this.projectService.selectProject(project);
  }

  onNewProject(): void {
    this.projectService.selectProject(null);
  }
}
