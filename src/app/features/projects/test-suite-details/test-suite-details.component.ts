import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-suite-details',
  template: `
    <div class="test-suite-container">
      <app-breadcrumb [items]="['Projects', 'New Suite']"></app-breadcrumb>

      <div class="header-section">
        <h1 class="page-title">Test Suite Details</h1>
        <p class="page-description">Configure your automated testing parameters and manage test cases.</p>
      </div>

      <div class="form-card">
        <form [formGroup]="suiteForm">
          <div class="form-group">
            <label for="suiteName">TestSuite Name</label>
            <input
              id="suiteName"
              type="text"
              formControlName="name"
              placeholder="e.g. Core API Validation Suite"
              class="form-control">
          </div>

          <div class="form-group">
            <label for="suiteDescription">Suite Description</label>
            <textarea
              id="suiteDescription"
              formControlName="description"
              placeholder="Describe the purpose and scope of this test suite..."
              class="form-control textarea"
              rows="5"></textarea>
          </div>

          <div class="form-group">
            <label for="suiteType">Suite Type</label>
            <div class="select-wrapper">
              <select id="suiteType" formControlName="type" class="form-control select-input">
                <option value="" disabled>Select suite type</option>
                <option value="manual">Manual</option>
                <option value="automated">Automated</option>
              </select>
              <div class="select-arrow">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>
          </div>

          <div class="test-cases-section">
            <div class="test-cases-header">
              <div class="test-cases-title">
                <h3>Test Cases</h3>
                <p>Define and organize the individual test cases for this suite.</p>
              </div>
              <button type="button" class="add-testcases-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                Add TestCases
              </button>
            </div>

            <div class="empty-test-cases">
              <div class="empty-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/><path d="M13 6h8"/><path d="M13 12h8"/><path d="M13 18h8"/></svg>
              </div>
              <h4>No test cases added yet</h4>
              <p>Start by adding test cases to this suite.</p>
            </div>
          </div>

          <div class="form-footer">
            <button type="button" class="btn-cancel" (click)="onCancel()">Cancel</button>
            <app-button variant="primary" (click)="onSave()">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="save-icon"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
              Save and Proceed
            </app-button>
          </div>
        </form>
      </div>

      <div class="system-footer">
        <div class="footer-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="footer-icon"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
          <span>SYSTEM ENCRYPTED</span>
        </div>
        <div class="footer-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="footer-icon"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <span>LAST EDITED 2M AGO</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .test-suite-container {
      width: 100%;
      max-width: 900px;
    }
    .header-section {
      margin: 12px 0 16px;
    }
    .page-title {
      font-size: 24px;
      font-weight: 800;
      color: #312E81;
      margin-bottom: 4px;
      letter-spacing: -0.02em;
    }
    .page-description {
      color: #6B7280;
      font-size: 18px;
    }
    .form-card {
      background: white;
      border-radius: 12px;
      padding: 24px;
      border: 1px solid #E5E7EB;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    .form-group {
      margin-bottom: 20px;
      label {
        display: block;
        font-size: 14px;
        font-weight: 700;
        margin-bottom: 8px;
        color: #312E81;
      }
    }
    .form-control {
      width: 100%;
      padding: 14px 16px;
      border-radius: 10px;
      border: 1px solid #E5E7EB;
      background-color: #F9FAFB;
      font-size: 16px;
      outline: none;
      transition: all 0.2s;
      color: #111827;
      &:focus {
        border-color: var(--primary-color);
        background-color: white;
        box-shadow: 0 0 0 3px rgba(255, 84, 0, 0.1);
      }
      &::placeholder {
        color: #9CA3AF;
      }
    }
    .textarea {
      resize: vertical;
      min-height: 120px;
    }
    .select-wrapper {
      position: relative;
    }
    .select-input {
      appearance: none;
      cursor: pointer;
      padding-right: 40px;
    }
    .select-arrow {
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
      color: #312E81;
    }
    .test-cases-section {
      margin-top: 32px;
      padding-top: 24px;
      border-top: 1px solid #F3F4F6;
    }
    .test-cases-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 20px;
    }
    .test-cases-title {
      h3 {
        font-size: 22px;
        font-weight: 700;
        color: #312E81;
        margin-bottom: 4px;
      }
      p {
        color: #6B7280;
        font-size: 15px;
      }
    }
    .add-testcases-btn {
      background-color: #FF5400;
      color: white;
      padding: 12px 20px;
      border-radius: 10px;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 15px;
      transition: background-color 0.2s;
      &:hover {
        background-color: #E64A00;
      }
    }
    .empty-test-cases {
      border: 1px dashed #D1D5DB;
      border-radius: 12px;
      padding: 24px 20px;
      text-align: center;
      background-color: #FFFFFF;
    }
    .empty-icon {
      width: 48px;
      height: 48px;
      background-color: #F5F3FF;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 16px;
      color: #7C3AED;
    }
    .empty-test-cases h4 {
      font-size: 18px;
      font-weight: 700;
      color: #374151;
      margin-bottom: 8px;
    }
    .empty-test-cases p {
      color: #6B7280;
      font-size: 15px;
    }
    .form-footer {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 32px;
      margin-top: 32px;
      padding-top: 24px;
      border-top: 1px solid #F3F4F6;
    }
    .btn-cancel {
      background: transparent;
      color: #374151;
      font-weight: 600;
      font-size: 16px;
      &:hover {
        color: #111827;
      }
    }
    .save-icon {
      margin-right: 8px;
    }
    .system-footer {
      display: flex;
      justify-content: center;
      gap: 40px;
      padding: 24px 0 8px;
    }
    .footer-item {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #9CA3AF;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.05em;
    }
    .footer-icon {
      color: #4F46E5;
    }
  `]
})
export class TestSuiteDetailsComponent {
  suiteForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.suiteForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      type: ['']
    });
  }

  onCancel() {
    this.router.navigate(['/projects/create']);
  }

  onSave() {
    if (this.suiteForm.valid) {
      console.log('Suite data:', this.suiteForm.value);
      // Navigate back or to a success page
      this.router.navigate(['/projects/create']);
    } else {
      this.suiteForm.markAllAsTouched();
    }
  }
}
