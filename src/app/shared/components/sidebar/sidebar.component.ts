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
        <!-- Test Suite Section -->
        <div class="nav-group">
          <span class="group-label">TEST SUITE</span>
          <a routerLink="/test-suites" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-item">
            <div class="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 7 12 12 3 7"/><path d="m21 12-9 5-9-5"/><path d="m21 17-9 5-9-5"/><path d="M12 22V12"/></svg>
            </div>
            <span class="nav-label">TestSuiteDashboard</span>
          </a>
          <a routerLink="/test-suites/new" [class.active]="isRouteActive('/test-suites/new') || isRouteActive('/test-suites/edit')" class="nav-item">
            <div class="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
            </div>
            <span class="nav-label">TestSuiteForm (New/Edit)</span>
          </a>
        </div>

        <!-- Test Case Section -->
        <div class="nav-group">
          <span class="group-label">TEST CASE</span>
          <div [class.active]="isRouteActive('/test-cases')" class="nav-item" style="cursor: default;">
            <div class="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
            </div>
            <span class="nav-label">TestCaseForm (Details)</span>
          </div>
        </div>

        <!-- Contracts Section -->
        <div class="nav-group">
          <span class="group-label">CONTRACTS</span>
          <a routerLink="/contracts/new" [class.active]="isRouteActive('/contracts/new') || isRouteActive('/contracts/edit')" class="nav-item">
            <div class="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
            </div>
            <span class="nav-label">ContractMaster (Registration)</span>
          </a>
          <a routerLink="/contracts/properties" [class.active]="isRouteActive('/properties')" class="nav-item">
            <div class="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3h18v18H3z"/><path d="M9 3v18"/><path d="M15 3v18"/><path d="M3 9h18"/><path d="M3 15h18"/></svg>
            </div>
            <span class="nav-label">ContractProperties</span>
          </a>
        </div>

        <!-- Test Data Section -->
        <div class="nav-group">
          <span class="group-label">TEST DATA</span>
          <div [class.active]="isRouteActive('/test-data')" class="nav-item" style="cursor: default;">
            <div class="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>
            </div>
            <span class="nav-label">TestDataManagement</span>
          </div>
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
  constructor(private router: Router) {}
  ngOnInit(): void {}

  isRouteActive(route: string): boolean {
    return this.router.url.includes(route);
  }
}
