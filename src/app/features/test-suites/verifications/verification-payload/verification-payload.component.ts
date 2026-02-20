import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderService } from '../../../../core/services/header.service';
import { LoadingService } from '../../../../core/services/loading.service';
import { Payload } from '../../../../core/models/payload.model';

@Component({
  selector: 'app-verification-payload',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './verification-payload.component.html',
  styleUrls: ['./verification-payload.component.scss']
})
export class VerificationPayloadComponent implements OnInit {
  entryPayloads: Payload[] = [];
  exitPayloads: Payload[] = [];

  entryForm: FormGroup;
  exitForm: FormGroup;

  isEditingEntry = false;
  isEditingExit = false;
  selectedEntryPayload: Payload | null = null;
  selectedExitPayload: Payload | null = null;

  constructor(
    private fb: FormBuilder,
    private headerService: HeaderService,
    private loadingService: LoadingService
  ) {
    this.entryForm = this.fb.group({
      payloadId: ['', Validators.required],
      schema: ['', [Validators.required, this.jsonValidator]]
    });

    this.exitForm = this.fb.group({
      payloadId: ['', Validators.required],
      schema: ['', [Validators.required, this.jsonValidator]]
    });
  }

  ngOnInit(): void {
    this.headerService.setHeader(
      'VERIFICATION CONTRACT PAYLOAD',
      [
        { label: 'Projects', route: '/projects' },
        { label: 'Verifications', route: '/verifications' },
        { label: 'Contract Payload', route: '' }
      ],
      'Technical oversight of entry and exit payload schemas. Prioritize managing existing contracts or register new structural requirements.'
    );

    this.fetchPayloads();
  }

  fetchPayloads(): void {
    this.loadingService.show();

    // Mock API fetch
    // GET /api/payloads
    setTimeout(() => {
      this.entryPayloads = [
        {
          id: '1',
          name: 'user_auth_req_v2',
          summary: 'Object { userId, authToken, deviceId }',
          schema: JSON.stringify({
            type: "object",
            properties: {
              userId: { type: "string" },
              authToken: { type: "string" },
              deviceId: { type: "string" }
            }
          }, null, 2)
        },
        {
          id: '2',
          name: 'profile_update_v1',
          summary: 'Object { firstName, lastName, avatarUrl }',
          schema: JSON.stringify({
            type: "object",
            properties: {
              firstName: { type: "string" },
              lastName: { type: "string" },
              avatarUrl: { type: "string" }
            }
          }, null, 2)
        }
      ];

      this.exitPayloads = [
        {
          id: '3',
          name: 'standard_success_resp',
          summary: 'Object { status, timestamp, data: {} }',
          schema: JSON.stringify({
            type: "object",
            properties: {
              status: { type: "string" },
              timestamp: { type: "string" },
              data: { type: "object" }
            }
          }, null, 2)
        },
        {
          id: '4',
          name: 'error_validation_v1',
          summary: 'Object { errorCode, message, fields: [] }',
          schema: JSON.stringify({
            type: "object",
            properties: {
              errorCode: { type: "string" },
              message: { type: "string" },
              fields: { type: "array" }
            }
          }, null, 2)
        }
      ];
      this.loadingService.hide();
    }, 1000);
  }

  onEditEntry(payload: Payload): void {
    this.isEditingEntry = true;
    this.selectedEntryPayload = payload;
    this.entryForm.patchValue({
      payloadId: payload.name,
      schema: payload.schema
    });
  }

  onDeleteEntry(payload: Payload): void {
    if (confirm(`Are you sure you want to delete ${payload.name}?`)) {
      this.entryPayloads = this.entryPayloads.filter(p => p.id !== payload.id);
    }
  }

  onUploadEntry(): void {
    console.log('Upload entry payload schema');
  }

  registerEntryPayload(): void {
    if (this.entryForm.invalid) {
      alert('Please provide a valid Payload ID and JSON schema.');
      return;
    }

    this.loadingService.show();
    const formData = this.entryForm.value;

    if (this.isEditingEntry && this.selectedEntryPayload) {
      // PUT /api/payloads/:id
      console.log('Updating entry payload', formData);
      setTimeout(() => {
        const index = this.entryPayloads.findIndex(p => p.id === this.selectedEntryPayload?.id);
        if (index !== -1) {
          this.entryPayloads[index] = {
            ...this.selectedEntryPayload!,
            name: formData.payloadId,
            schema: formData.schema,
            summary: this.generateSummary(formData.schema)
          };
        }
        this.resetEntryForm();
        this.loadingService.hide();
      }, 800);
    } else {
      // POST /api/payloads/register
      console.log('Registering new entry payload', formData);
      setTimeout(() => {
        const newPayload: Payload = {
          id: Math.random().toString(36).substr(2, 9),
          name: formData.payloadId,
          schema: formData.schema,
          summary: this.generateSummary(formData.schema)
        };
        this.entryPayloads.push(newPayload);
        this.resetEntryForm();
        this.loadingService.hide();
      }, 800);
    }
  }

  resetEntryForm(): void {
    this.isEditingEntry = false;
    this.selectedEntryPayload = null;
    this.entryForm.reset();
  }

  onEditExit(payload: Payload): void {
    this.isEditingExit = true;
    this.selectedExitPayload = payload;
    this.exitForm.patchValue({
      payloadId: payload.name,
      schema: payload.schema
    });
  }

  onDeleteExit(payload: Payload): void {
    if (confirm(`Are you sure you want to delete ${payload.name}?`)) {
      this.exitPayloads = this.exitPayloads.filter(p => p.id !== payload.id);
    }
  }

  onUploadExit(): void {
    console.log('Upload exit payload schema');
  }

  registerExitPayload(): void {
    if (this.exitForm.invalid) {
      alert('Please provide a valid Payload ID and JSON schema.');
      return;
    }

    this.loadingService.show();
    const formData = this.exitForm.value;

    if (this.isEditingExit && this.selectedExitPayload) {
      // PUT /api/payloads/:id
      console.log('Updating exit payload', formData);
      setTimeout(() => {
        const index = this.exitPayloads.findIndex(p => p.id === this.selectedExitPayload?.id);
        if (index !== -1) {
          this.exitPayloads[index] = {
            ...this.selectedExitPayload!,
            name: formData.payloadId,
            schema: formData.schema,
            summary: this.generateSummary(formData.schema)
          };
        }
        this.resetExitForm();
        this.loadingService.hide();
      }, 800);
    } else {
      // POST /api/payloads/register
      console.log('Registering new exit payload', formData);
      setTimeout(() => {
        const newPayload: Payload = {
          id: Math.random().toString(36).substr(2, 9),
          name: formData.payloadId,
          schema: formData.schema,
          summary: this.generateSummary(formData.schema)
        };
        this.exitPayloads.push(newPayload);
        this.resetExitForm();
        this.loadingService.hide();
      }, 800);
    }
  }

  resetExitForm(): void {
    this.isEditingExit = false;
    this.selectedExitPayload = null;
    this.exitForm.reset();
  }

  private jsonValidator(control: any) {
    if (!control.value) return null;
    try {
      JSON.parse(control.value);
      return null;
    } catch (e) {
      return { invalidJson: true };
    }
  }

  private generateSummary(schemaStr: string): string {
    try {
      const schema = JSON.parse(schemaStr);
      if (schema.type === 'object' && schema.properties) {
        const props = Object.keys(schema.properties).join(', ');
        return `Object { ${props} }`;
      }
      return 'Object { ... }';
    } catch (e) {
      return 'Object { ... }';
    }
  }
}
