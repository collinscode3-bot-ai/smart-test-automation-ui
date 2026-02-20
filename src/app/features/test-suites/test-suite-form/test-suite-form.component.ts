import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TestSuiteService } from '../../../core/services/test-suite.service';
import { HeaderService } from '../../../core/services/header.service';
import { SharedModule } from '../../../shared/shared.module';
import { TestSuite } from '../../../core/models/test-suite.model';

/**
 * TestSuiteFormComponent handles both creation and editing of test suites.
 * It uses Reactive Forms for validation and dynamic routing for mode detection.
 */
@Component({
  selector: 'app-test-suite-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SharedModule],
  templateUrl: './test-suite-form.component.html',
  styleUrls: ['./test-suite-form.component.scss']
})
export class TestSuiteFormComponent implements OnInit {
  testSuiteForm!: FormGroup;
  isEditMode = false;
  suiteId: string | null = null;
  suiteTypes = ['Service Testing', 'E2E Testing', 'Neighbour Testing'];
  private currentTestCases: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private testSuiteService: TestSuiteService,
    private headerService: HeaderService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    // State Detection: Use ActivatedRoute to check for an :id parameter.
    this.suiteId = this.route.snapshot.paramMap.get('id');
    if (this.suiteId) {
      this.isEditMode = true;
      this.loadTestSuiteDetails(this.suiteId);
    }

    // Dynamic Header & Breadcrumbs based on mode.
    this.updateHeader();
  }

  /**
   * Initializes the reactive form with required validations.
   */
  private initForm(): void {
    this.testSuiteForm = this.fb.group({
      testSuiteName: ['', [Validators.required]],
      suiteDescription: [''],
      suiteType: ['', [Validators.required]]
    });
  }

  /**
   * Updates the global header title and breadcrumbs via HeaderService.
   */
  private updateHeader(): void {
    const title = this.isEditMode ? 'Edit Test Suite' : 'Create New Test Suite';
    const breadcrumbs = [
      { label: 'Projects', route: '/projects' },
      { label: 'Test Suite Management', route: '/test-suites' },
      { label: title, route: this.router.url }
    ];
    const description = 'Configure a new automated testing suite for your project requirements.';
    this.headerService.setHeader(title, breadcrumbs, description);
  }

  /**
   * Edit Mode Fetch: calls a placeholder method fetchTestSuiteById(id) to populate the form.
   * @param id The test suite ID to load.
   */
  private loadTestSuiteDetails(id: string): void {
    console.log(`Fetching test suite details for ID: ${id}`);

    // Placeholder for actual API call
    this.testSuiteService.getTestSuiteById(id).subscribe(suite => {
      if (suite) {
        this.currentTestCases = suite.testCases || [];
        this.testSuiteForm.patchValue({
          testSuiteName: suite.name,
          suiteDescription: suite.description,
          suiteType: suite.type
        });
      }
    });
  }

  /**
   * Submission Logic: Handles both POST (Create) and PUT (Edit) operations.
   */
  saveSuite(): void {
    if (this.testSuiteForm.invalid) {
      // Mark all fields as touched to show validation errors
      this.testSuiteForm.markAllAsTouched();
      return;
    }

    const formData = this.testSuiteForm.value;
    const suiteData: Partial<TestSuite> = {
      name: formData.testSuiteName,
      description: formData.suiteDescription,
      type: formData.suiteType,
      testCases: this.currentTestCases
    };

    if (this.isEditMode && this.suiteId) {
      // PUT /api/test-suites/:id (Edit mode placeholder)
      console.log('Updating test suite:', this.suiteId, suiteData);
      this.testSuiteService.updateTestSuite(this.suiteId, suiteData).subscribe(() => {
        this.router.navigate(['/test-suites']);
      });
    } else {
      // POST /api/test-suites (Create mode placeholder)
      console.log('Creating new test suite:', suiteData);
      this.testSuiteService.createTestSuite(suiteData as TestSuite).subscribe(() => {
        this.router.navigate(['/test-suites']);
      });
    }
  }

  /**
   * Navigation Integration: "Cancel" button navigates back to the Test Suite Dashboard.
   */
  onCancel(): void {
    this.router.navigate(['/test-suites']);
  }

  /**
   * Navigates to the TestCaseFormComponent to add a new test case.
   */
  addTestCase(): void {
    if (this.suiteId) {
      this.router.navigate(['/test-suites', this.suiteId, 'test-cases', 'new']);
    } else {
      // If no suiteId, we should probably save the suite first or use a temporary state
      console.log('Save the suite before adding test cases, or implement temp state.');
      this.router.navigate(['/test-suites', 'temp', 'test-cases', 'new']);
    }
  }
}
