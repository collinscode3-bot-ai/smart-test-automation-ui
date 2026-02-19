import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  template: `
    <div class="layout-wrapper">
      <app-header *ngIf="!isTestSuitePage"></app-header>
      <app-search-bar *ngIf="!isTestSuitePage"></app-search-bar>
      <main class="main-container">
        <div class="content-flex" [class.centered]="isTestSuitePage">
          <div class="sidebar-column" *ngIf="!isTestSuitePage">
            <app-sidebar></app-sidebar>
          </div>
          <div class="page-content">
            <router-outlet></router-outlet>
          </div>
        </div>
      </main>
      <footer class="footer" *ngIf="!isTestSuitePage">
        <p>© 2024 Project Entry Tool. All rights reserved.</p>
      </footer>
    </div>
  `,
  styles: [`
    .layout-wrapper {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background-color: var(--bg-color);
    }
    .main-container {
      flex: 1;
      width: 100%;
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 40px 60px;
    }
    .content-flex {
      display: flex;
      gap: 40px;
    }
    .sidebar-column {
      flex: 0 0 300px;
    }
    .page-content {
      flex: 1;
    }
    .content-flex.centered {
      justify-content: center;
    }
    .footer {
      padding: 40px;
      text-align: center;
      font-size: 13px;
      color: var(--text-muted);
    }
  `]
})
export class LayoutComponent {
  constructor(public router: Router) {}

  get isTestSuitePage(): boolean {
    return this.router.url === '/projects/test-suite';
  }
}
