import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  template: `
    <aside class="sidebar">
      <div class="sidebar-logo">
        <div class="logo-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
        </div>
        <span class="logo-text">EntryTool</span>
      </div>

      <nav class="sidebar-nav">
        <!-- Projects Section -->
        <div class="nav-group">
          <span class="group-label">PROJECTS</span>
          <a routerLink="/projects" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-item">
            <div class="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
            </div>
            <span class="nav-label">Dashboard</span>
          </a>
          <a routerLink="/projects/create" routerLinkActive="active" class="nav-item">
            <div class="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
            </div>
            <span class="nav-label">New Project</span>
          </a>
        </div>

        <!-- Test Suites Section -->
        <div class="nav-group">
          <span class="group-label">TEST SUITES</span>
          <a routerLink="/test-suites" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-item">
            <div class="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 7 12 12 3 7"/><path d="m21 12-9 5-9-5"/><path d="m21 17-9 5-9-5"/><path d="M12 22V12"/></svg>
            </div>
            <span class="nav-label">Dashboard</span>
          </a>
          <a routerLink="/test-suites/new" [class.active]="isRouteActive('/test-suites/new') || isRouteActive('/test-suites/edit')" class="nav-item">
            <div class="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
            </div>
            <span class="nav-label">New Suite</span>
          </a>
        </div>

        <!-- Contracts Section -->
        <div class="nav-group">
          <span class="group-label">CONTRACTS</span>
          <a routerLink="/contracts/new" [class.active]="isRouteActive('/contracts/new') || isRouteActive('/contracts/edit')" class="nav-item">
            <div class="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
            </div>
            <span class="nav-label">Contract Master</span>
          </a>
          <a routerLink="/contracts/properties" routerLinkActive="active" class="nav-item">
            <div class="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3h18v18H3z"/><path d="M9 3v18"/><path d="M15 3v18"/><path d="M3 9h18"/><path d="M3 15h18"/></svg>
            </div>
            <span class="nav-label">Contract Properties</span>
          </a>
          <a routerLink="/contracts/payload" routerLinkActive="active" class="nav-item">
            <div class="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" y1="22" x2="12" y2="12"/></svg>
            </div>
            <span class="nav-label">Payload Configuration</span>
          </a>
        </div>

        <!-- Test Data Management Section -->
        <div class="nav-group">
          <span class="group-label">TEST DATA MANAGEMENT</span>
          <a routerLink="/test-suites/1/test-cases/1/test-data/new" routerLinkActive="active" class="nav-item">
            <div class="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>
            </div>
            <span class="nav-label">Data Management</span>
          </a>
        </div>

        <!-- Test Execution Section -->
        <div class="nav-group">
          <span class="group-label">TEST EXECUTION</span>
          <a routerLink="/executions/1" routerLinkActive="active" class="nav-item">
            <div class="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
            </div>
            <span class="nav-label">Execution Summary</span>
          </a>
        </div>
      </nav>

      <div class="sidebar-footer">
        <div class="user-info">
          <div class="user-avatar-small">
            <img src="https://ui-avatars.com/api/?name=User&background=FFD5AD&color=1A1A1A" alt="User">
          </div>
          <div class="user-details">
            <span class="user-name">User Name</span>
            <span class="user-role">Administrator</span>
          </div>
        </div>
      </div>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: var(--sidebar-width);
      height: 100vh;
      display: flex;
      flex-direction: column;
      background-color: #FFFFFF;
      border-right: 1px solid var(--border-color);
    }
    .sidebar-logo {
      padding: 32px 24px;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .logo-icon {
      width: 40px;
      height: 40px;
      background-color: var(--accent-color);
      color: white;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .logo-text {
      font-size: 20px;
      font-weight: 800;
      color: var(--text-primary);
      letter-spacing: -0.02em;
    }
    .sidebar-nav {
      flex: 1;
      padding: 0 16px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      overflow-y: auto;
    }
    .nav-group {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .group-label {
      padding-left: 16px;
      font-size: 11px;
      font-weight: 700;
      color: var(--text-muted);
      letter-spacing: 0.05em;
      margin-bottom: 4px;
    }
    .nav-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 16px;
      border-radius: 8px;
      color: var(--text-secondary);
      font-weight: 500;
      transition: all 0.2s;
      text-decoration: none;
      &:hover {
        background-color: #FFF7ED;
        color: var(--accent-color);
      }
      &.active {
        background-color: #FFF7ED;
        color: var(--accent-color);
        font-weight: 600;
        .nav-icon {
          color: var(--accent-color);
        }
      }
    }
    .nav-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-muted);
    }
    .sidebar-footer {
      padding: 24px;
      border-top: 1px solid var(--border-color);
    }
    .user-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .user-avatar-small {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      overflow: hidden;
      img { width: 100%; height: 100%; }
    }
    .user-details {
      display: flex;
      flex-direction: column;
    }
    .user-name {
      font-size: 14px;
      font-weight: 600;
      color: var(--text-primary);
    }
    .user-role {
      font-size: 12px;
      color: var(--text-muted);
    }
  `]
})
export class SidebarComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit(): void {}

  isRouteActive(route: string): boolean {
    return this.router.url.includes(route);
  }
}
