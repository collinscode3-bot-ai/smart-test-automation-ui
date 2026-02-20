import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from '../../../core/services/header.service';
import { LoadingService } from '../../../core/services/loading.service';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-verifications',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './verifications.component.html',
  styleUrls: ['./verifications.component.scss']
})
export class VerificationsComponent implements OnInit {
  suiteId: string | null = null;
  caseId: string | null = null;
  verifications: any[] = [];

  constructor(
    private headerService: HeaderService,
    private loadingService: LoadingService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.suiteId = this.route.snapshot.paramMap.get('suiteId');
    this.caseId = this.route.snapshot.paramMap.get('caseId');

    this.updateHeader();
    this.loadVerifications();
  }

  private updateHeader(): void {
    this.headerService.setHeader(
      'Verifications',
      [
        { label: 'Projects', route: '/projects' },
        { label: 'Test Suite', route: '/test-suites' },
        { label: 'Verifications', route: this.router.url }
      ],
      'Configure detailed verification steps and parameters for your test case.'
    );
  }

  /**
   * Placeholder method for the GET API call to fetch existing verification sequences.
   */
  loadVerifications(): void {
    this.loadingService.show();
    /*
       API Placeholder:
       GET /api/test-suites/:suiteId/test-cases/:caseId/verifications
    */
    setTimeout(() => {
      this.verifications = [
        { id: '1', name: 'AuthService', seq: 1 },
        { id: '2', name: 'TokenValidator', seq: 2 }
      ];
      this.loadingService.hide();
    }, 1000);
  }

  /**
   * Placeholder method for the POST or PUT API call to save verification sequences.
   */
  saveVerifications(): void {
    this.loadingService.show();
    /*
       API Placeholder:
       POST/PUT /api/test-suites/:suiteId/test-cases/:caseId/verifications
    */
    setTimeout(() => {
      this.loadingService.hide();
      this.navigateBack();
    }, 1000);
  }

  onCancel(): void {
    this.navigateBack();
  }

  private navigateBack(): void {
    if (this.suiteId && this.caseId) {
      if (this.caseId === 'new') {
        this.router.navigate(['/test-suites', this.suiteId, 'test-cases', 'new']);
      } else {
        this.router.navigate(['/test-suites', this.suiteId, 'test-cases', 'edit', this.caseId]);
      }
    } else {
      this.router.navigate(['/test-suites']);
    }
  }

  onEdit(verification: any): void {
    console.log('Editing verification:', verification);
  }

  onDelete(verification: any): void {
    console.log('Deleting verification:', verification);
    this.verifications = this.verifications.filter(v => v.id !== verification.id);
    // Re-sequence
    this.verifications.forEach((v, index) => v.seq = index + 1);
  }

  onAddVerification(): void {
    console.log('Adding verification');
    const newSeq = this.verifications.length + 1;
    this.verifications.push({ id: Date.now().toString(), name: 'New Verification', seq: newSeq });
  }
}
