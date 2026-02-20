import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../../core/services/header.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-header',
  template: `
    <header class="header">
      <div class="header-left">
        <app-breadcrumb [items]="(breadcrumbLabels$ | async) || []"></app-breadcrumb>
        <h1 class="page-title">{{ title$ | async }}</h1>
        <p class="page-description" *ngIf="description$ | async as desc">{{ desc }}</p>
      </div>
      <div class="header-actions">
        <button class="icon-btn notification-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bell"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
        </button>
        <div class="user-avatar">
          <img src="https://ui-avatars.com/api/?name=User&background=FFD5AD&color=1A1A1A" alt="User Avatar">
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      padding: 24px 40px;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      background: var(--card-bg);
      border-bottom: 1px solid var(--border-color);
    }
    .header-left {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .page-title {
      font-size: 32px;
      font-weight: 800;
      color: #4338CA;
      margin: 0;
      letter-spacing: -0.01em;
    }
    .page-description {
      font-size: 16px;
      color: var(--text-secondary);
      margin: 0;
      max-width: 600px;
    }
    .header-actions {
      display: flex;
      align-items: center;
      gap: 16px;
      padding-top: 8px;
    }
    .icon-btn {
      background: none;
      color: var(--link-color);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px;
      border-radius: 50%;
      transition: background 0.2s;
      &:hover {
        background: rgba(79, 70, 229, 0.05);
      }
    }
    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      border: 1px solid var(--border-color);
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  `]
})
export class HeaderComponent implements OnInit {
  title$: Observable<string>;
  breadcrumbLabels$: Observable<string[]>;
  description$: Observable<string>;

  constructor(private headerService: HeaderService) {
    this.title$ = this.headerService.pageTitle$;
    this.description$ = this.headerService.description$;
    this.breadcrumbLabels$ = this.headerService.breadcrumbs$.pipe(
      map(breadcrumbs => breadcrumbs.map(b => b.label))
    );
  }

  ngOnInit(): void {}
}
