import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from '../../../core/services/header.service';
import { SharedModule } from '../../../shared/shared.module';
import { TestCase, TestCaseContract } from '../../../core/models/test-case.model';
import { Observable, of } from 'rxjs';

/**
 * TestCaseFormComponent handles both creation and editing of individual test cases.
 * It features dynamic contract management and integrates with the global shell header.
 */
@Component({
  selector: 'app-test-case-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SharedModule],
  templateUrl: './test-case-form.component.html',
  styleUrls: ['./test-case-form.component.scss']
})
export class TestCaseFormComponent implements OnInit {
  testCaseForm!: FormGroup;
  isEditMode = false;
  testCaseId: string | null = null;
  suiteId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private headerService: HeaderService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    // State Detection: Use ActivatedRoute to check for an :id parameter and :suiteId
    this.testCaseId = this.route.snapshot.paramMap.get('id');
    this.suiteId = this.route.snapshot.paramMap.get('suiteId');

    if (this.testCaseId) {
      this.isEditMode = true;
      this.loadTestCaseDetails(this.testCaseId);
    }

    this.updateHeader();
  }

  /**
   * Initializes the reactive form with validations and an empty FormArray for contracts.
   */
  private initForm(): void {
    this.testCaseForm = this.fb.group({
      testcaseName: ['', [Validators.required]],
      description: ['', [Validators.required]],
      contracts: this.fb.array([])
    });
  }

  /**
   * Getter for the contracts FormArray.
   */
  get contracts(): FormArray {
    return this.testCaseForm.get('contracts') as FormArray;
  }

  /**
   * Adds a new contract to the dynamic list.
   * @param name Optional name for the contract.
   * @param type Optional type for the contract.
   */
  addContract(name: string = '', type: string = ''): void {
    this.contracts.push(this.fb.group({
      name: [name, Validators.required],
      type: [type, Validators.required]
    }));
  }

  /**
   * Removes a contract from the dynamic list.
   * @param index The index of the contract to remove.
   */
  removeContract(index: number): void {
    this.contracts.removeAt(index);
  }

  /**
   * Updates the global header title and breadcrumbs via HeaderService.
   */
  private updateHeader(): void {
    const title = this.isEditMode ? 'Edit TestCase Details' : 'TestCase Details';
    const breadcrumbs = [
      { label: 'Test Suite', route: '/test-suites' },
      { label: 'Suite Details', route: this.suiteId ? `/test-suites/edit/${this.suiteId}` : '/test-suites' },
      { label: 'TestCase Details', route: this.router.url }
    ];
    const description = 'Configure your test case parameters and associated contracts.';
    this.headerService.setHeader(title, breadcrumbs, description);
  }

  /**
   * Edit Mode Fetch: calls a placeholder method to populate the form.
   * @param id The test case ID to load.
   */
  private loadTestCaseDetails(id: string): void {
    console.log(`Fetching test case details for ID: ${id}`);

    /*
       API Placeholder:
       GET /api/test-cases/:id
    */
    this.fetchTestCaseById(id).subscribe(testCase => {
      if (testCase) {
        this.testCaseForm.patchValue({
          testcaseName: testCase.name,
          description: testCase.description
        });

        // Clear and repopulate FormArray
        while (this.contracts.length) {
          this.contracts.removeAt(0);
        }
        testCase.contracts.forEach(contract => {
          this.addContract(contract.name, contract.type);
        });
      }
    });
  }

  /**
   * Submission Logic: Handles both Create and Edit operations.
   * Data persistence flow:
   * 1. Validate form data.
   * 2. Prepare payload from form values.
   * 3. Call backend API (mocked below via placeholder).
   * 4. Navigate back to the parent Test Suite form upon successful persistence.
   */
  saveTestCase(): void {
    if (this.testCaseForm.invalid) {
      this.testCaseForm.markAllAsTouched();
      return;
    }

    const formData = this.testCaseForm.value;
    console.log('Saving test case data:', formData);

    /*
       API Placeholder:
       this.http.post('/api/test-cases', formData).subscribe({
         next: (response) => {
           console.log('Test case saved successfully:', response);
           this.navigateBack();
         },
         error: (error) => {
           console.error('Error saving test case:', error);
         }
       });
    */

    // Simulating success for the mock/redirect phase
    this.navigateBack();
  }

  /**
   * Handles the "Cancel" action.
   */
  onCancel(): void {
    this.navigateBack();
  }

  /**
   * Shared navigation logic to return to the TestSuiteFormComponent.
   */
  private navigateBack(): void {
    if (this.suiteId) {
      this.router.navigate(['/test-suites/edit', this.suiteId]);
    } else {
      // If no suite context, default back to test suites dashboard or new suite form
      this.router.navigate(['/test-suites/new']);
    }
  }

  /**
   * Placeholder method for fetching a test case by ID.
   * @param id The ID to fetch.
   */
  private fetchTestCaseById(id: string): Observable<TestCase> {
    // Mocking an existing test case for demonstration in Edit Mode
    return of({
      id: id,
      name: 'Auth Response Schema Validation',
      description: 'Verifies that the authentication response matches the expected JSON schema.',
      contracts: [
        { id: 'c1', name: 'Auth Response Schema', type: 'Consumer Contract' },
        { id: 'c2', name: 'User Profile Definition', type: 'Provider Contract' }
      ]
    });
  }

  /**
   * Navigates to the Contract Registration (Contract Master) view.
   */
  onAddContract(): void {
    this.router.navigate(['/contracts/new']);
  }

  /**
   * Navigates to the Verifications view for the current test case.
   */
  addVerifications(): void {
    const caseId = this.testCaseId || 'new';
    if (this.suiteId) {
      this.router.navigate(['/test-suites', this.suiteId, 'test-cases', caseId, 'verifications']);
    } else {
      // For standalone test case creation, use a placeholder suiteId
      this.router.navigate(['/test-suites', 'temp', 'test-cases', caseId, 'verifications']);
    }
  }

  /**
   * Navigates to the Test Data Management view for the current test case.
   */
  addTestData(): void {
    const caseId = this.testCaseId || 'new';
    if (this.suiteId) {
      this.router.navigate(['/test-suites', this.suiteId, 'test-cases', caseId, 'test-data', 'new']);
    } else {
      this.router.navigate(['/test-suites', 'temp', 'test-cases', caseId, 'test-data', 'new']);
    }
  }
}
