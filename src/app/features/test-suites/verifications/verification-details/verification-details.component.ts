import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HeaderService } from '../../../../core/services/header.service';
import { LoadingService } from '../../../../core/services/loading.service';
import { SharedModule } from '../../../../shared/shared.module';
import { VerificationDetails, VerificationParam } from '../../../../core/models/verification.model';
import { VerificationParameterModalComponent } from '../verification-parameter-modal/verification-parameter-modal.component';

@Component({
  selector: 'app-verification-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, SharedModule, MatDialogModule],
  templateUrl: './verification-details.component.html',
  styleUrls: ['./verification-details.component.scss']
})
export class VerificationDetailsComponent implements OnInit {
  private dialog = inject(MatDialog);
  verificationForm: FormGroup;
  isEditMode = false;
  verificationId: string | null = null;
  suiteId: string | null = null;
  caseId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private headerService: HeaderService,
    private loadingService: LoadingService
  ) {
    this.verificationForm = this.fb.group({
      appName: ['', Validators.required],
      serviceName: ['', Validators.required],
      sequenceNo: ['', Validators.required],
      verificationParamsType: ['Query Param', Validators.required],
      baseUrl: ['', Validators.required],
      verifyIfPreviousSuccess: [true],
      isCompositeKey: [false],
      delimiter: [':'],
      delimiterEnabled: [true],
      parameters: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.suiteId = this.route.snapshot.paramMap.get('suiteId');
    this.caseId = this.route.snapshot.paramMap.get('caseId');
    this.verificationId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.verificationId;

    this.updateHeader();

    if (this.isEditMode && this.verificationId) {
      this.loadVerificationData(this.verificationId);
    }
  }

  private updateHeader(): void {
    this.headerService.setHeader(
      'Verification Details',
      [
        { label: 'Projects', route: '/projects' },
        { label: 'Test Suite', route: '/test-suites' },
        { label: 'Verifications', route: `/test-suites/${this.suiteId}/test-cases/${this.caseId}/verifications` },
        { label: 'Verification Details', route: '' }
      ],
      'Configure detailed verification steps and parameters for your test case.'
    );
  }

  get parameters(): FormArray {
    return this.verificationForm.get('parameters') as FormArray;
  }

  addParameter(param?: VerificationParam): void {
    if (!param) {
      const dialogRef = this.dialog.open(VerificationParameterModalComponent, {
        width: '800px',
        data: { mode: 'add', sequence: this.parameters.length + 1 },
        disableClose: true
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.pushParameterToForm(result);
        }
      });
    } else {
      this.pushParameterToForm(param);
    }
  }

  private pushParameterToForm(param: VerificationParam): void {
    const paramGroup = this.fb.group({
      sequence: [param.sequence, Validators.required],
      key: [param.key, Validators.required],
      valuePath: [param.valuePath || '', Validators.required],
      valueSource: [param.valueSource || '', Validators.required],
      dataType: [param.dataType || '', Validators.required],
      value: [param.value || '', Validators.required]
    });
    this.parameters.push(paramGroup);
  }

  onEditParameter(index: number): void {
    const param = this.parameters.at(index).value;
    const dialogRef = this.dialog.open(VerificationParameterModalComponent, {
      width: '800px',
      data: { mode: 'edit', parameter: param },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.parameters.at(index).patchValue(result);
      }
    });
  }

  removeParameter(index: number): void {
    this.parameters.removeAt(index);
    // Re-sequence
    this.parameters.controls.forEach((control, i) => {
      control.get('sequence')?.setValue(i + 1);
    });
  }

  loadVerificationData(id: string): void {
    this.loadingService.show();
    setTimeout(() => {
      const mockData: VerificationDetails = {
        id: id,
        appName: 'Shipment Tracking',
        serviceName: 'TrackServiceV1',
        sequenceNo: '10',
        verificationParamsType: 'Query Param',
        baseUrl: 'https://api.fedex.com/track/v1',
        verifyIfPreviousSuccess: true,
        isCompositeKey: false,
        delimiter: ':',
        parameters: [
          { sequence: 1, key: 'tracking_number', valuePath: '$.trackingNumber', valueSource: 'Payload', dataType: 'String', value: '123456789' },
          { sequence: 2, key: 'api_key', valuePath: '$.apiKey', valueSource: 'Config', dataType: 'String', value: 'SECRET_KEY' }
        ]
      };

      this.verificationForm.patchValue({
        appName: mockData.appName,
        serviceName: mockData.serviceName,
        sequenceNo: mockData.sequenceNo,
        verificationParamsType: mockData.verificationParamsType,
        baseUrl: mockData.baseUrl,
        verifyIfPreviousSuccess: mockData.verifyIfPreviousSuccess,
        isCompositeKey: mockData.isCompositeKey,
        delimiter: mockData.delimiter,
        delimiterEnabled: true
      });

      this.parameters.clear();
      mockData.parameters.forEach(p => this.addParameter(p));

      this.loadingService.hide();
    }, 1000);
  }

  onSubmit(): void {
    if (this.verificationForm.invalid) {
      return;
    }

    this.loadingService.show();
    const formData = this.verificationForm.value;

    if (this.isEditMode && this.verificationId) {
      console.log('Updating verification', formData);
      setTimeout(() => {
        this.loadingService.hide();
        this.onCancel();
      }, 1000);
    } else {
      console.log('Creating verification', formData);
      setTimeout(() => {
        this.loadingService.hide();
        this.onCancel();
      }, 1000);
    }
  }

  onCancel(): void {
    this.router.navigate(['/test-suites', this.suiteId, 'test-cases', this.caseId, 'verifications']);
  }

  toggleBoolean(controlName: string, value: boolean): void {
    this.verificationForm.get(controlName)?.setValue(value);
  }
}
