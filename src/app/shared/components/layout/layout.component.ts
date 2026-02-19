import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  template: `
    <div class="layout-wrapper">
      <app-header></app-header>
      <app-search-bar *ngIf="showGlobalSearch"></app-search-bar>
      <main class="main-container">
        <div class="content-flex">
          <div class="page-content">
            <router-outlet></router-outlet>
          </div>
        </div>
      </main>
      <footer class="footer">
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
      justify-content: center;
    }
    .page-content {
      flex: 1;
      max-width: 1000px;
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
  constructor(private router: Router) {}

  get showGlobalSearch(): boolean {
    return !this.router.url.startsWith('/projects') && !this.router.url.startsWith('/test-suites');
  }
}
