import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  template: `
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb mb-4">
        <li *ngFor="let item of items; let last = last" class="breadcrumb-item d-flex align-items-center" [class.active]="last" [attr.aria-current]="last ? 'page' : null">
          <span *ngIf="!last" class="text-secondary opacity-75 fw-medium">{{ item }}</span>
          <span *ngIf="last" class="fw-bold" style="color: var(--link-color);">{{ item }}</span>
        </li>
      </ol>
    </nav>
  `,
  styles: [`
    .breadcrumb-item + .breadcrumb-item::before {
      content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='9 18 15 12 9 6'%3E%3C/polyline%3E%3C/svg%3E");
      vertical-align: middle;
      padding-right: 0.5rem;
      color: var(--text-muted);
    }
    .breadcrumb {
      font-size: 13px;
      background-color: transparent;
      padding: 0;
    }
  `]
})
export class BreadcrumbComponent {
  @Input() items: string[] = [];
}
