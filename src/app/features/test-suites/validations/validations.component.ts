import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { of, delay } from 'rxjs';
import { HeaderService } from '../../../core/services/header.service';
import { LoadingService } from '../../../core/services/loading.service';
import { SharedModule } from '../../../shared/shared.module';
import { Validation, ErrorConfiguration, ValidationParameter } from '../../../core/models/validation.model';

@Component({
  selector: 'app-validations',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SharedModule, RouterModule],
  templateUrl: './validations.component.html',
  styleUrls: ['./validations.component.scss']
})
export class ValidationsComponent implements OnInit {
  validationForm!: FormGroup;
  isEditMode = false;
  validationId: string | null = null;
  suiteId: string | null = null;
  caseId: string | null = null;

  payloadFormats = ['JSON', 'XML', 'CSV'];
  validationTypes = ['Field Validation', 'Schema Validation', 'Business Rule'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private headerService: HeaderService,
    private loadingService: LoadingService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.suiteId = params.get('suiteId');
      this.caseId = params.get('caseId');
      this.validationId = params.get('id');

      if (this.validationId) {
        this.isEditMode = true;
        this.fetchValidationById(this.validationId);
      } else {
        this.addErrorConfiguration();
        this.addParameter();
      }

      this.updateHeader();
    });
  }

  private initForm(): void {
    this.validationForm = this.fb.group({
      sequenceNo: ['', Validators.required],
      validationName: ['', Validators.required],
      payloadId: ['', Validators.required],
      payloadFormat: ['JSON', Validators.required],
      validationType: ['Field Validation', Validators.required],
      validationSourceData: ['', Validators.required],
      errorConfigurations: this.fb.array([]),
      parameters: this.fb.array([])
    });
  }

  private updateHeader(): void {
    this.headerService.setHeader(
      'Validations',
      [
        { label: 'Projects', route: '/projects' },
        { label: 'Test Case', route: `/test-suites/${this.suiteId}/test-cases/edit/${this.caseId}` },
        { label: 'Verification', route: `/test-suites/${this.suiteId}/test-cases/${this.caseId}/verifications/manage` },
        { label: 'Validations', route: this.router.url }
      ],
      'Configure and manage validation rules for your test suite.'
    );
  }

  get errorConfigurations(): FormArray {
    return this.validationForm.get('errorConfigurations') as FormArray;
  }

  get parameters(): FormArray {
    return this.validationForm.get('parameters') as FormArray;
  }

  addErrorConfiguration(data?: ErrorConfiguration): void {
    const group = this.fb.group({
      expectedOutcome: [data?.expectedOutcome || '', Validators.required],
      errorCode: [data?.errorCode || '', Validators.required],
      errorMessage: [data?.errorMessage || '', Validators.required]
    });
    this.errorConfigurations.push(group);
  }

  removeErrorConfiguration(index: number): void {
    if (this.errorConfigurations.length > 1) {
      this.errorConfigurations.removeAt(index);
    }
  }

  addParameter(data?: ValidationParameter): void {
    const group = this.fb.group({
      seqNo: [data?.seqNo || this.parameters.length + 1, Validators.required],
      type: [data?.type || '', Validators.required],
      value: [data?.value || '', Validators.required],
      dataType: [data?.dataType || '', Validators.required]
    });
    this.parameters.push(group);
  }

  removeParameter(index: number): void {
    if (this.parameters.length > 1) {
      this.parameters.removeAt(index);
    }
  }

  /**
   * GET /api/validations/:id
   * Fetches existing validation data in Edit mode.
   */
  private fetchValidationById(id: string): void {
    this.loadingService.show();

    // Simulating API call
    of({
      id: id,
      sequenceNo: '1',
      validationName: 'Sample Validation',
      payloadId: 'REQ_12345',
      payloadFormat: 'JSON',
      validationType: 'Field Validation',
      validationSourceData: '$.data.status',
      errorConfigurations: [
        { expectedOutcome: 'Success', errorCode: 'ERR_001', errorMessage: 'Validation failed' }
      ],
      parameters: [
        { seqNo: 1, type: 'Header', value: 'Content-Type', dataType: 'String' }
      ]
    } as Validation).pipe(delay(1000)).subscribe(data => {
      this.validationForm.patchValue({
        sequenceNo: data.sequenceNo,
        validationName: data.validationName,
        payloadId: data.payloadId,
        payloadFormat: data.payloadFormat,
        validationType: data.validationType,
        validationSourceData: data.validationSourceData
      });

      data.errorConfigurations.forEach(err => this.addErrorConfiguration(err));
      data.parameters.forEach(param => this.addParameter(param));

      this.loadingService.hide();
    });
  }

  /**
   * POST /api/validations or PUT /api/validations/:id
   * Triggers the save API and navigates back.
   */
  saveValidation(): void {
    if (this.validationForm.invalid) {
      this.validationForm.markAllAsTouched();
      return;
    }

    this.loadingService.show();
    const payload = this.validationForm.value;

    if (this.isEditMode) {
      // PUT /api/validations/:id
      console.log('Updating validation:', this.validationId, payload);
      of(null).pipe(delay(1000)).subscribe(() => {
        this.loadingService.hide();
        this.navigateToParent();
      });
    } else {
      // POST /api/validations
      console.log('Creating validation:', payload);
      of(null).pipe(delay(1000)).subscribe(() => {
        this.loadingService.hide();
        this.navigateToParent();
      });
    }
  }

  onCancel(): void {
    this.navigateToParent();
  }

  private navigateToParent(): void {
    // Return to TestSuiteFormComponent (which manages the suite/cases)
    // The prompt says "Return the user to the TestSuiteFormComponent"
    // TestSuiteFormComponent route is /test-suites/edit/:id
    this.router.navigate(['/test-suites', 'edit', this.suiteId]);
  }
}
