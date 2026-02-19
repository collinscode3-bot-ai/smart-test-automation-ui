import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  template: `
    <nav class="breadcrumb">
      <span *ngFor="let item of items; let last = last">
        <span [class.current]="last" class="breadcrumb-item">{{ item }}</span>
        <span *ngIf="!last" class="separator">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </span>
      </span>
    </nav>
  `,
  styles: [`
    .breadcrumb {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 24px;
      font-size: 14px;
      font-weight: 600;
    }
    .breadcrumb-item {
      color: var(--text-primary);
      &.current {
        color: var(--link-color);
      }
    }
    .separator {
      color: var(--text-primary);
      display: inline-flex;
      align-items: center;
    }
  `]
})
export class BreadcrumbComponent {
  @Input() items: string[] = [];
}
