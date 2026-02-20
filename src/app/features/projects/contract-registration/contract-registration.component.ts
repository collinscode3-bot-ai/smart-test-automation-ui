import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from '../../../core/services/header.service';
import { SharedModule } from '../../../shared/shared.module';
import { Contract, FieldProperty } from '../../../core/models/contract.model';

/**
 * ContractRegistrationComponent handles both creation and editing of contract details.
 * It manages schema definitions, base contract data, and field properties.
 */
@Component({
  selector: 'app-contract-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SharedModule],
  templateUrl: './contract-registration.component.html',
  styleUrls: ['./contract-registration.component.scss']
})
export class ContractRegistrationComponent implements OnInit {
  contractForm!: FormGroup;
  isEditMode = false;
  contractId: string | null = null;

  // Placeholder for dynamic field properties
  defaultFieldProperties: string[] = ['contractId', 'version', 'status'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private headerService: HeaderService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.contractId = this.route.snapshot.paramMap.get('id');
    if (this.contractId) {
      this.isEditMode = true;
      this.fetchContractById(this.contractId);
    }

    this.updateHeader();
  }

  /**
   * Initializes the reactive form with default values.
   */
  private initForm(): void {
    this.contractForm = this.fb.group({
      schemaMode: ['file'], // 'file' or 'json'
      schemaContent: [''],
      baseMode: ['json'], // 'file' or 'json'
      baseContent: [this.getDefaultBaseJson()],
      fieldProperties: this.fb.array(
        this.defaultFieldProperties.map(prop => this.fb.control(prop))
      )
    });
  }

  /**
   * Updates the global header via HeaderService.
   */
  private updateHeader(): void {
    const title = this.isEditMode ? 'Edit Contract Details' : 'Contract Details';
    const breadcrumbs = [
      { label: 'Projects', route: '/projects' },
      { label: this.isEditMode ? 'Edit Contract' : 'New Contract', route: this.router.url }
    ];
    const description = 'Define the structural and baseline data for your test suites by providing schema definitions and initial state configurations.';

    this.headerService.setHeader(title, breadcrumbs, description);
  }

  /**
   * Returns the getter for fieldProperties FormArray.
   */
  get fieldProperties(): FormArray {
    return this.contractForm.get('fieldProperties') as FormArray;
  }

  /**
   * Returns a default JSON string for the base contract.
   */
  private getDefaultBaseJson(): string {
    const defaultJson = {
      contractId: "UUID-7821-X",
      version: "1.0.0",
      data: {
        status: "active",
        params: {}
      }
    };
    return JSON.stringify(defaultJson, null, 2);
  }

  /**
   * Fetches contract details by ID from the API (Placeholder).
   * @param id The contract ID to fetch.
   */
  private fetchContractById(id: string): void {
    console.log(`Fetching contract by ID: ${id}`);

    /*
    GET /api/contracts/:id
    this.contractService.getContract(id).subscribe(contract => {
      this.contractForm.patchValue({
        schemaMode: contract.schemaMode,
        schemaContent: contract.schemaContent,
        baseMode: contract.baseMode,
        baseContent: contract.baseContent
      });

      // Clear and rebuild fieldProperties array
      const fieldArray = this.fieldProperties;
      fieldArray.clear();
      contract.fieldProperties.forEach(prop => {
        fieldArray.push(this.fb.control(prop.name));
      });
    });
    */

    // Simulating data population for demonstration
    this.contractForm.patchValue({
      schemaMode: 'json',
      schemaContent: '{"type": "object"}'
    });
  }

  /**
   * Toggles the mode for schema or base contract sections.
   * @param section The section to toggle ('schema' or 'base').
   * @param mode The mode to set ('file' or 'json').
   */
  toggleMode(section: 'schema' | 'base', mode: 'file' | 'json'): void {
    if (section === 'schema') {
      this.contractForm.patchValue({ schemaMode: mode });
    } else {
      this.contractForm.patchValue({ baseMode: mode });
    }
  }

  /**
   * Copies the current base JSON content to the clipboard.
   */
  copyBaseJson(): void {
    const content = this.contractForm.get('baseContent')?.value;
    if (content) {
      navigator.clipboard.writeText(content).then(() => {
        console.log('JSON copied to clipboard');
        // Optional: show a toast notification
      });
    }
  }

  /**
   * Adds a new field property to the dynamic list.
   * @param propertyName The name of the property to add.
   */
  addFieldProperty(propertyName: string = ''): void {
    if (propertyName) {
      this.fieldProperties.push(this.fb.control(propertyName));
    } else {
      // In a real app, this might open a modal or add an empty control for user input
      const newProp = prompt('Enter field property name:');
      if (newProp) {
        this.fieldProperties.push(this.fb.control(newProp));
      }
    }
  }

  /**
   * Removes a field property from the dynamic list.
   * @param index The index of the property to remove.
   */
  removeFieldProperty(index: number): void {
    this.fieldProperties.removeAt(index);
  }

  /**
   * Handles form submission for both Create and Edit modes.
   */
  onSubmit(): void {
    if (this.contractForm.invalid) {
      return;
    }

    const formData = this.contractForm.value;
    console.log('Submitting contract data:', formData);

    if (this.isEditMode) {
      /*
      PUT /api/contracts/:id
      this.contractService.updateContract(this.contractId!, formData).subscribe(() => {
        this.router.navigate(['/projects']);
      });
      */
      this.router.navigate(['/projects']);
    } else {
      /*
      POST /api/contracts
      this.contractService.createContract(formData).subscribe(() => {
        this.router.navigate(['/projects']);
      });
      */
      this.router.navigate(['/projects']);
    }
  }

  /**
   * Navigates back to the Projects dashboard.
   */
  onCancel(): void {
    this.router.navigate(['/projects']);
  }
}
