import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  template: `
    <aside class="sidebar d-flex flex-column h-100">
      <div class="sidebar-logo px-4 py-4 d-flex align-items-center gap-3">
        <div class="logo-icon d-flex align-items-center justify-content-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
        </div>
        <span class="logo-text">EntryTool</span>
      </div>

      <nav class="sidebar-nav flex-grow-1 px-3 overflow-auto">
        <ul class="nav flex-column gap-2">
          <!-- Projects Section -->
          <li class="nav-item">
            <div class="nav-category d-flex align-items-center justify-content-between py-2 px-3" (click)="toggleSection('projects')">
              <span class="group-label">PROJECTS</span>
              <svg [class.rotated]="sections.projects" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="chevron"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
            <div class="collapse" [class.show]="sections.projects">
              <ul class="nav flex-column ms-3 gap-1">
                <li class="nav-item">
                  <a routerLink="/projects" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-link d-flex align-items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
                    Dashboard
                  </a>
                </li>
                <li class="nav-item">
                  <a routerLink="/projects/create" routerLinkActive="active" class="nav-link d-flex align-items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                    New Project
                  </a>
                </li>
              </ul>
            </div>
          </li>

          <!-- Test Suites Section -->
          <li class="nav-item">
            <div class="nav-category d-flex align-items-center justify-content-between py-2 px-3" (click)="toggleSection('testSuites')">
              <span class="group-label">TEST SUITES</span>
              <svg [class.rotated]="sections.testSuites" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="chevron"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
            <div class="collapse" [class.show]="sections.testSuites">
              <ul class="nav flex-column ms-3 gap-1">
                <li class="nav-item">
                  <a routerLink="/test-suites" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-link d-flex align-items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 7 12 12 3 7"/><path d="m21 12-9 5-9-5"/><path d="m21 17-9 5-9-5"/><path d="M12 22V12"/></svg>
                    Dashboard
                  </a>
                </li>
                <li class="nav-item">
                  <a routerLink="/test-suites/new" [class.active]="isRouteActive('/test-suites/new') || isRouteActive('/test-suites/edit')" class="nav-link d-flex align-items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
                    New Suite
                  </a>
                </li>
              </ul>
            </div>
          </li>

          <!-- Contracts Section -->
          <li class="nav-item">
            <div class="nav-category d-flex align-items-center justify-content-between py-2 px-3" (click)="toggleSection('contracts')">
              <span class="group-label">CONTRACTS</span>
              <svg [class.rotated]="sections.contracts" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="chevron"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
            <div class="collapse" [class.show]="sections.contracts">
              <ul class="nav flex-column ms-3 gap-1">
                <li class="nav-item">
                  <a routerLink="/contracts/new" [class.active]="isRouteActive('/contracts/new') || isRouteActive('/contracts/edit')" class="nav-link d-flex align-items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
                    Contract Master
                  </a>
                </li>
                <li class="nav-item">
                  <a routerLink="/contracts/properties" routerLinkActive="active" class="nav-link d-flex align-items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3h18v18H3z"/><path d="M9 3v18"/><path d="M15 3v18"/><path d="M3 9h18"/><path d="M3 15h18"/></svg>
                    Contract Properties
                  </a>
                </li>
                <li class="nav-item">
                  <a routerLink="/contracts/payload" routerLinkActive="active" class="nav-link d-flex align-items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" y1="22" x2="12" y2="12"/></svg>
                    Payload Configuration
                  </a>
                </li>
              </ul>
            </div>
          </li>

          <!-- Test Data Management Section -->
          <li class="nav-item">
            <div class="nav-category d-flex align-items-center justify-content-between py-2 px-3" (click)="toggleSection('testData')">
              <span class="group-label">TEST DATA MANAGEMENT</span>
              <svg [class.rotated]="sections.testData" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="chevron"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
            <div class="collapse" [class.show]="sections.testData">
              <ul class="nav flex-column ms-3 gap-1">
                <li class="nav-item">
                  <a routerLink="/test-suites/1/test-cases/1/test-data/new" routerLinkActive="active" class="nav-link d-flex align-items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>
                    Data Management
                  </a>
                </li>
              </ul>
            </div>
          </li>

          <!-- Test Execution Section -->
          <li class="nav-item">
            <div class="nav-category d-flex align-items-center justify-content-between py-2 px-3" (click)="toggleSection('execution')">
              <span class="group-label">TEST EXECUTION</span>
              <svg [class.rotated]="sections.execution" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="chevron"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
            <div class="collapse" [class.show]="sections.execution">
              <ul class="nav flex-column ms-3 gap-1">
                <li class="nav-item">
                  <a routerLink="/executions/1" routerLinkActive="active" class="nav-link d-flex align-items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
                    Execution Summary
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </nav>

      <div class="sidebar-footer p-4 border-top">
        <div class="user-info d-flex align-items-center gap-3">
          <div class="user-avatar-small rounded-circle overflow-hidden">
            <img src="https://ui-avatars.com/api/?name=User&background=FFD5AD&color=1A1A1A" alt="User" width="32" height="32">
          </div>
          <div class="user-details d-flex flex-column">
            <span class="user-name fw-bold">User Name</span>
            <span class="user-role text-muted">Administrator</span>
          </div>
        </div>
      </div>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: var(--sidebar-width);
      background-color: #FFFFFF;
      border-right: 1px solid var(--border-color);
    }
    .logo-icon {
      width: 40px;
      height: 40px;
      background-color: var(--accent-color);
      color: white;
      border-radius: 10px;
    }
    .logo-text {
      font-size: 20px;
      font-weight: 800;
      color: var(--text-primary);
      letter-spacing: -0.02em;
    }
    .nav-category {
      cursor: pointer;
      user-select: none;
    }
    .group-label {
      font-size: 11px;
      font-weight: 700;
      color: var(--text-muted);
      letter-spacing: 0.05em;
    }
    .chevron {
      transition: transform 0.2s ease;
      color: var(--text-muted);
    }
    .chevron.rotated {
      transform: rotate(180deg);
    }
    .nav-link {
      padding: 10px 16px;
      border-radius: 8px;
      color: var(--text-secondary);
      font-weight: 500;
      transition: all 0.2s;
      &:hover {
        background-color: #F3F4F6;
        color: var(--primary-color);
      }
      &.active {
        background-color: #EEF2FF;
        color: var(--primary-color);
        font-weight: 600;
        svg {
          color: var(--primary-color);
        }
      }
    }
    .nav-item svg {
      color: var(--text-muted);
    }
    .user-name {
      font-size: 14px;
      color: var(--text-primary);
    }
    .user-role {
      font-size: 12px;
    }
  `]
})
export class SidebarComponent implements OnInit {
  sections = {
    projects: true,
    testSuites: true,
    contracts: true,
    testData: true,
    execution: true
  };

  constructor(private router: Router) {}
  ngOnInit(): void {}

  toggleSection(section: keyof typeof SidebarComponent.prototype.sections): void {
    this.sections[section] = !this.sections[section];
  }

  isRouteActive(route: string): boolean {
    return this.router.url.includes(route);
  }
}
