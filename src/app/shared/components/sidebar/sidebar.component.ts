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
        <a routerLink="/projects" routerLinkActive="active" class="nav-item" [routerLinkActiveOptions]="{exact: false}">
          <div class="nav-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
          </div>
          <span class="nav-label">Projects</span>
        </a>

        <a routerLink="/test-suites" routerLinkActive="active" class="nav-item">
          <div class="nav-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 7 12 12 3 7"/><path d="m21 12-9 5-9-5"/><path d="m21 17-9 5-9-5"/><path d="M12 22V12"/></svg>
          </div>
          <span class="nav-label">Test Suite Management</span>
        </a>

        <a routerLink="/archives" routerLinkActive="active" class="nav-item">
          <div class="nav-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8H3V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2Z"/><path d="M21 8v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8"/><path d="M10 12h4"/></svg>
          </div>
          <span class="nav-label">Archives</span>
        </a>
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
      gap: 4px;
    }
    .nav-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      border-radius: 8px;
      color: var(--text-secondary);
      font-weight: 500;
      transition: all 0.2s;
      text-decoration: none;
      &:hover {
        background-color: #F9FAFB;
        color: var(--primary-color);
      }
      &.active {
        background-color: #FFF5F0;
        color: var(--primary-color);
        font-weight: 600;
        .nav-icon {
          color: var(--primary-color);
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
