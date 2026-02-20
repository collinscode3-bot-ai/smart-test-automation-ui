import { Component, OnInit } from '@angular/core';

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
        <div class="nav-group">
          <span class="group-label">PROJECTS</span>
          <a routerLink="/projects" routerLinkActive="active" class="nav-item" [routerLinkActiveOptions]="{exact: true}">
            <div class="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
            </div>
            <span class="nav-label">Projects Dashboard</span>
          </a>
          <a routerLink="/projects/create" routerLinkActive="active" class="nav-item">
            <div class="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>
            </div>
            <span class="nav-label">Create/Edit Project</span>
          </a>
        </div>

        <div class="nav-group">
          <span class="group-label">TEST SUITES</span>
          <a routerLink="/test-suites" routerLinkActive="active" class="nav-item" [routerLinkActiveOptions]="{exact: true}">
            <div class="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 7 12 12 3 7"/><path d="m21 12-9 5-9-5"/><path d="m21 17-9 5-9-5"/><path d="M12 22V12"/></svg>
            </div>
            <span class="nav-label">Test Suite Dashboard</span>
          </a>
          <a routerLink="/test-suites/new" routerLinkActive="active" class="nav-item">
            <div class="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
            </div>
            <span class="nav-label">Create/Edit Test Suite</span>
          </a>
          <a routerLinkActive="active" class="nav-item" [routerLink]="null" style="pointer-events: none; opacity: 0.6;">
            <div class="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
            </div>
            <span class="nav-label">Test Case Details</span>
          </a>
        </div>

        <div class="nav-group">
          <span class="group-label">OTHER</span>
          <a routerLink="/archives" routerLinkActive="active" class="nav-item">
            <div class="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8H3V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2Z"/><path d="M21 8v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8"/><path d="M10 12h4"/></svg>
            </div>
            <span class="nav-label">Archives</span>
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
      width: 280px;
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
      background-color: var(--primary-color);
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
        background-color: #F9FAFB;
        color: #4338CA;
      }
      &.active {
        background-color: #EEF2FF;
        color: #4338CA;
        font-weight: 600;
        .nav-icon {
          color: #4338CA;
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
  constructor() {}
  ngOnInit(): void {}
}
