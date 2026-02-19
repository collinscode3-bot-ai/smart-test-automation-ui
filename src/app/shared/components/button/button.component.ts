import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    <button
      [type]="type"
      [class]="'btn ' + variant"
      [disabled]="disabled">
      <ng-content></ng-content>
      <svg *ngIf="showArrow" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="arrow-icon"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
    </button>
  `,
  styles: [`
    .btn {
      padding: 12px 24px;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: all 0.2s;
      white-space: nowrap;
    }
    .primary {
      background-color: var(--primary-color);
      color: white;
      &:hover:not(:disabled) {
        background-color: var(--primary-hover-color);
      }
      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }
    .secondary {
      background-color: transparent;
      color: var(--text-primary);
      &:hover:not(:disabled) {
        background-color: rgba(0, 0, 0, 0.05);
      }
    }
    .arrow-icon {
      margin-left: 4px;
    }
  `]
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' = 'button';
  @Input() variant: 'primary' | 'secondary' = 'primary';
  @Input() disabled = false;
  @Input() showArrow = false;
}
