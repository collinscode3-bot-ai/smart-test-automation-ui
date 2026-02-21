import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from '../../../core/services/header.service';
import { LoadingService } from '../../../core/services/loading.service';
import { SharedModule } from '../../../shared/shared.module';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { delay, finalize, tap } from 'rxjs/operators';

interface ServiceFlow {
  name: string;
  status: 'passed' | 'failed' | 'skipped' | 'processing';
  colorClass: string;
}

interface Validation {
  name: string;
  value: string;
  result: 'PASSED' | 'FAILED' | 'SKIPPED';
}

interface JsonValidation {
  name: string;
  result: 'PASSED' | 'FAILED';
}

interface ServiceResult {
  serviceName: string;
  inputPayload: string;
  outputPayload: string;
  resultSummary: string;
  status: 'PASSED' | 'FAILED' | 'SKIPPED';
  fieldValidations: Validation[];
  entryPayload: string;
  exitPayload: string;
  jsonValidations: JsonValidation[];
}

interface TestCaseExecution {
  id: string;
  name: string;
  description: string;
  status: 'PASSED' | 'FAILED' | 'SKIPPED';
  serviceFlow: ServiceFlow[];
  results: ServiceResult[];
  isExpanded?: boolean;
}

interface ExecutionSummary {
  id: string;
  name: string;
  description: string;
  status: 'SUCCESS' | 'FAILURE';
  startTime: string;
  endTime: string;
  duration: string;
  durationPercent: number;
  totalTestCases: number;
  testCases: TestCaseExecution[];
}

@Component({
  selector: 'app-test-suite-execution-summary',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './test-suite-execution-summary.component.html',
  styleUrls: ['./test-suite-execution-summary.component.scss']
})
export class TestSuiteExecutionSummaryComponent implements OnInit, OnDestroy {
  Math = Math;
  executionId: string | null = null;
  executionData: ExecutionSummary | null = null;
  paginatedTestCases: TestCaseExecution[] = [];
  currentPage = 1;
  itemsPerPage = 5;
  totalItems = 0;
  private subscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private headerService: HeaderService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.headerService.setHeader(
      'Test Suite Execution Summary',
      [
        { label: 'Executions', route: '/executions' },
        { label: 'Test Suite Execution Summary', route: this.router.url }
      ],
      'Detailed breakdown of the recent regression run for critical services.'
    );

    this.subscription.add(
      this.route.paramMap.subscribe(params => {
        this.executionId = params.get('id');
        if (this.executionId) {
          this.fetchExecutionSummary(this.executionId);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  fetchExecutionSummary(id: string): void {
    this.loadingService.show();

    // API Placeholder: GET /api/executions/:id
    // For now using mock data
    this.getMockExecutionData(id).pipe(
      delay(1000), // Simulate network delay
      tap(data => {
        this.executionData = data;
        this.totalItems = data.totalTestCases;
        this.updatePagination();
      }),
      finalize(() => this.loadingService.hide())
    ).subscribe();
  }

  private getMockExecutionData(id: string): Observable<ExecutionSummary> {
    return of({
      id: id,
      name: 'Core API Regression Suite',
      description: 'Full regression suite for payment processing, user authentication, and profile management services.',
      status: 'SUCCESS',
      startTime: '2025-11-05 10:00:00',
      endTime: '2025-11-05 10:15:20',
      duration: '15m 20s',
      durationPercent: 75,
      totalTestCases: 12,
      testCases: [
        {
          id: 'TC-001',
          name: 'User Login Flow',
          description: 'Validates OAuth2 credential exchange and JWT generation.',
          status: 'PASSED',
          isExpanded: true,
          serviceFlow: [
            { name: 'Authentication Service', status: 'passed', colorClass: 'teal' },
            { name: 'User Profile Service', status: 'passed', colorClass: 'green' },
            { name: 'Authorization Service', status: 'passed', colorClass: 'teal' },
            { name: 'Order Service', status: 'failed', colorClass: 'red' },
            { name: 'Payment Service', status: 'skipped', colorClass: 'orange' },
            { name: 'Notification Service', status: 'skipped', colorClass: 'grey' }
          ],
          results: [
            {
              serviceName: 'User Profile Service',
              inputPayload: "{'token': 'xyz...'}",
              outputPayload: "{'user': 'test', ...}",
              resultSummary: 'Profile fetch successful.',
              status: 'PASSED',
              fieldValidations: [
                { name: 'user_id_format', value: '"usr_1a2b3c4d"', result: 'PASSED' },
                { name: 'email_valid', value: '"test@example.com"', result: 'PASSED' },
                { name: 'account_status', value: '"active"', result: 'FAILED' }
              ],
              entryPayload: '{ "requestId": "req_9921", "timestamp": "2023-11-05T10:00:02Z" }',
              exitPayload: '{ "status": "success", "code": 200 }',
              jsonValidations: [
                { name: 'Check Headers', result: 'PASSED' },
                { name: 'Verify Signature', result: 'PASSED' }
              ]
            }
          ]
        },
        {
          id: 'TC-002',
          name: 'Payment Gateway Integration',
          description: 'End-to-end checkout process with Stripe sandbox environment.',
          status: 'PASSED',
          serviceFlow: [],
          results: []
        },
        {
          id: 'TC-003',
          name: 'Profile Image Upload',
          description: 'Testing S3 bucket write permissions and image resizing.',
          status: 'FAILED',
          serviceFlow: [],
          results: []
        },
        {
          id: 'TC-004',
          name: 'Email Notification Webhook',
          description: 'Verifies SendGrid callback reliability under load.',
          status: 'SKIPPED',
          serviceFlow: [],
          results: []
        },
        {
          id: 'TC-005',
          name: 'Password Reset Validation',
          description: 'Ensuring security token expiry and complexity requirements.',
          status: 'PASSED',
          serviceFlow: [],
          results: []
        },
        // Mocking more for pagination
        ...Array.from({ length: 7 }, (_, i) => ({
          id: `TC-00${i + 6}`,
          name: `Mock Test Case ${i + 6}`,
          description: `Description for mock test case ${i + 6}`,
          status: 'PASSED' as const,
          serviceFlow: [],
          results: []
        }))
      ]
    });
  }

  updatePagination(): void {
    if (!this.executionData) return;
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedTestCases = this.executionData.testCases.slice(start, end);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  toggleTestCase(testCase: TestCaseExecution): void {
    testCase.isExpanded = !testCase.isExpanded;
  }

  onDownloadReport(): void {
    console.log('Downloading report for execution:', this.executionId);
  }

  onReRunSuite(): void {
    console.log('Re-running suite for execution:', this.executionId);
    // API Placeholder: POST /api/executions/:id/re-run
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      // Could add a toast message here
      console.log('Copied to clipboard');
    });
  }
}
