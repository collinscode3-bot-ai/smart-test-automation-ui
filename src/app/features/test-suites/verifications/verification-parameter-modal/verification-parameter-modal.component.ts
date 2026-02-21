import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { VerificationParam } from '../../../../core/models/verification.model';

@Component({
  selector: 'app-verification-parameter-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './verification-parameter-modal.component.html',
  styleUrls: ['./verification-parameter-modal.component.scss']
})
export class VerificationParameterModalComponent implements OnInit {
  public dialogRef = inject(MatDialogRef<VerificationParameterModalComponent>);
  public data = inject(MAT_DIALOG_DATA);
  paramForm: FormGroup;
  isEditMode = false;
  dataTypes: string[] = ['String', 'Number', 'Boolean', 'JSON', 'Date', 'Array'];

  constructor(
    private fb: FormBuilder
  ) {
    this.isEditMode = this.data.mode === 'edit';

    this.paramForm = this.fb.group({
      sequence: [this.data.parameter?.sequence ?? this.data.sequence ?? 1, Validators.required],
      key: [this.data.parameter?.key ?? '', Validators.required],
      valuePath: [this.data.parameter?.valuePath ?? '', Validators.required],
      valueSource: [this.data.parameter?.valueSource ?? '', Validators.required],
      dataType: [this.data.parameter?.dataType ?? '', Validators.required],
      value: [this.data.parameter?.value ?? '', Validators.required]
    });
  }

  ngOnInit(): void {
    // Supplementary API calls (like fetching dynamic "Data Types") would be placed here
    // Example:
    // this.dataTypeService.getDataTypes().subscribe(types => this.dataTypes = types);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.paramForm.valid) {
      this.dialogRef.close(this.paramForm.value);
    }
  }
}
