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
          <div class="icon-box" [ngClass]="project.iconType">
            <ng-container [ngSwitch]="project.iconType">
              <svg *ngSwitchCase="'globe'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              <svg *ngSwitchCase="'rocket'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-5c1.62-2.2 5-3 5-3l1 1"/><path d="M12 15v5s3.03-.55 5-2c2.2-1.62 3-5 3-5l-1-1"/></svg>
              <svg *ngSwitchDefault xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/></svg>
            </ng-container>
          </div>
          <span class="project-name">{{ project.title }}</span>
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
      &.folder { background-color: #F5F3FF; color: #7C3AED; }
      &.globe { background-color: #ECFDF5; color: #10B981; }
      &.rocket { background-color: #FFFBEB; color: #F59E0B; }
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
