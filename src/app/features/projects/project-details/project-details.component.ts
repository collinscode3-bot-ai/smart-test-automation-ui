import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-project-details',
  template: `
    <div class="project-details-container">
      <app-breadcrumb [items]="['Projects', 'Create New Project']"></app-breadcrumb>

      <div class="form-card">
        <form [formGroup]="projectForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="projectName">Project Name <span class="required">*</span></label>
            <input
              type="text"
              id="projectName"
              formControlName="name"
              placeholder="e.g. Q4 Marketing Campaign"
              class="form-control"
              [class.error]="isFieldInvalid('name')">
          </div>

          <div class="form-group">
            <label for="projectDescription">Project Description</label>
            <textarea
              id="projectDescription"
              formControlName="description"
              placeholder="Describe the goals, scope, and key deliverables of this project..."
              class="form-control textarea"
              rows="8"></textarea>
            <p class="hint">Recommended: 100-200 words for clarity.</p>
          </div>

          <div class="form-actions">
            <app-button variant="secondary" (click)="onCancel()">Cancel</app-button>
            <app-button type="submit" [showArrow]="true" [disabled]="projectForm.invalid">
              Save and Proceed Further
            </app-button>
          </div>
        </form>
      </div>

      <div class="draft-status">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lock-icon"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        <span>Your data is automatically saved as a draft.</span>
      </div>
    </div>
  `,
  styles: [`
    .project-details-container {
      width: 100%;
    }
    .form-card {
      background: var(--card-bg);
      border-radius: 12px;
      padding: 48px;
      box-shadow: 0 4px 25px rgba(0,0,0,0.02);
      border: 1px solid var(--border-color);
      margin-bottom: 32px;
    }
    .form-group {
      margin-bottom: 32px;
      label {
        display: block;
        font-size: 15px;
        font-weight: 700;
        margin-bottom: 16px;
        color: var(--text-primary);
      }
    }
    .required {
      color: #EF4444;
      margin-left: 2px;
    }
    .form-control {
      width: 100%;
      padding: 16px 20px;
      border-radius: 8px;
      border: 1px solid var(--border-color);
      font-size: 16px;
      transition: all 0.2s;
      outline: none;
      background-color: #FFFFFF;
      &::placeholder {
        color: var(--text-muted);
        font-weight: 400;
      }
      &:focus {
        border-color: var(--link-color);
        box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.05);
      }
      &.error {
        border-color: #EF4444;
        &:focus {
          box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.05);
        }
      }
    }
    .textarea {
      resize: vertical;
      min-height: 200px;
      line-height: 1.6;
    }
    .hint {
      margin-top: 12px;
      font-size: 13px;
      color: var(--text-muted);
      font-style: italic;
    }
    .form-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 48px;
      padding-top: 40px;
      border-top: 1px solid var(--border-color);
    }
    .draft-status {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      color: var(--text-secondary);
      font-size: 14px;
      font-weight: 500;
    }
    .lock-icon {
      color: var(--text-muted);
    }
  `]
})
export class ProjectDetailsComponent {
  projectForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.projectForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onSubmit() {
    if (this.projectForm.valid) {
      console.log('Form submitted:', this.projectForm.value);
    } else {
      this.projectForm.markAllAsTouched();
    }
  }

  onCancel() {
    console.log('Cancelled');
  }
}
