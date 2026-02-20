import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HeaderService } from '../../../core/services/header.service';
import { LoadingService } from '../../../core/services/loading.service';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-test-data-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, SharedModule],
  templateUrl: './test-data-management.component.html',
  styleUrls: ['./test-data-management.component.scss']
})
export class TestDataManagementComponent implements OnInit {
  isEditMode = false;
  testDataId: string | null = null;
  suiteId: string | null = null;

  // Dynamic table state
  tableHeaders: string[] = [];
  dataKeys: string[] = [];
  tableData: any[] = [];

  constructor(
    private headerService: HeaderService,
    private loadingService: LoadingService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.suiteId = this.route.snapshot.paramMap.get('suiteId');
    this.testDataId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.testDataId;

    this.updateHeader();

    if (this.isEditMode) {
      this.fetchTestDataById(this.testDataId!);
    }
  }

  updateHeader(): void {
    const title = this.isEditMode ? 'Edit Test Data' : 'Test Data Management';
    const description = 'Upload and manage data sets for your automated testing. Supports .xlsx and .csv formats for bulk data entry.';
    const breadcrumbs = [
      { label: 'Projects', route: '/projects' },
      { label: 'Test Suite', route: '/test-suites' },
      { label: 'Test Data', route: '' }
    ];
    this.headerService.setHeader(title, breadcrumbs, description);
  }

  onFileUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.loadingService.show();

      // Simulate file parsing delay
      setTimeout(() => {
        /**
         * Placeholder for Excel/CSV parsing logic.
         * Recommended library: xlsx
         */

        const mockData = [
          { id: 101, fieldName: 'username', sampleValue: 'test_user_01', description: 'Primary test user for auth' },
          { id: 102, fieldName: 'password', sampleValue: 'Pass1234!', description: 'Standard test password' },
          { id: 103, fieldName: 'email', sampleValue: 'test01@example.com', description: 'Verification email' },
          { id: 104, fieldName: 'api_key', sampleValue: 'sk_test_51Mz...', description: 'Stripe test API key' },
          { id: 105, fieldName: 'retry_limit', sampleValue: '3', description: 'Maximum retries allowed' }
        ];

        this.processData(mockData);
        this.loadingService.hide();
      }, 1500);
    }
  }

  private processData(data: any[]): void {
    this.tableData = data;
    if (data.length > 0) {
      this.dataKeys = Object.keys(data[0]);
      this.tableHeaders = this.dataKeys.map(key => this.formatHeader(key));
    } else {
      this.dataKeys = [];
      this.tableHeaders = [];
    }
  }

  private formatHeader(key: string): string {
    // Convert camelCase or snake_case to Space Separated Title Case
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/_/g, ' ')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  }

  fetchTestDataById(id: string): void {
    // Placeholder for GET /api/test-data/:id
    this.loadingService.show();

    setTimeout(() => {
      const existingData = [
        { id: 201, fieldName: 'existing_field', sampleValue: 'existing_value', description: 'Fetched from API' },
        { id: 202, fieldName: 'config_mode', sampleValue: 'production', description: 'Environment config' }
      ];
      this.processData(existingData);
      this.loadingService.hide();
    }, 800);
  }

  clearData(): void {
    this.tableData = [];
    this.tableHeaders = [];
    this.dataKeys = [];
  }

  onCancel(): void {
    this.router.navigate(['/test-suites']);
  }

  saveTestData(): void {
    this.loadingService.show();

    /**
     * Placeholder for API persistence:
     *
     * if (this.isEditMode) {
     *   // PUT /api/test-data/:id
     * } else {
     *   // POST /api/test-data
     * }
     */

    setTimeout(() => {
      this.loadingService.hide();
      this.router.navigate(['/test-suites']);
    }, 1000);
  }
}
