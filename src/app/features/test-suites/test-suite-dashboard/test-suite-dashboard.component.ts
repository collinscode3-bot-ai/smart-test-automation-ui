import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TestSuiteService } from '../../../core/services/test-suite.service';
import { HeaderService } from '../../../core/services/header.service';
import { TestSuite } from '../../../core/models/test-suite.model';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-test-suite-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SharedModule],
  templateUrl: './test-suite-dashboard.component.html',
  styleUrls: ['./test-suite-dashboard.component.scss']
})
export class TestSuiteDashboardComponent implements OnInit {
  private currentPage$ = new BehaviorSubject<number>(1);
  testSuites$: Observable<TestSuite[]>;
  paginatedSuites$: Observable<TestSuite[]>;
  totalPages$: Observable<number[]>;
  searchControl = new FormControl('');
  itemsPerPage = 5;

  constructor(
    private testSuiteService: TestSuiteService,
    private headerService: HeaderService,
    private router: Router
  ) {
    const suites$ = this.testSuiteService.getTestSuites();
    const filter$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => value || '')
    );

    this.testSuites$ = combineLatest([suites$, filter$]).pipe(
      map(([suites, filter]) =>
        suites.filter(s => s.name.toLowerCase().includes(filter.toLowerCase()))
      )
    );

    this.totalPages$ = this.testSuites$.pipe(
      map(suites => {
        const pages = Math.ceil(suites.length / this.itemsPerPage);
        return Array.from({ length: pages }, (_, i) => i + 1);
      })
    );

    this.paginatedSuites$ = combineLatest([this.testSuites$, this.currentPage$]).pipe(
      map(([suites, page]) => {
        const start = (page - 1) * this.itemsPerPage;
        return suites.slice(start, start + this.itemsPerPage);
      })
    );
  }

  ngOnInit(): void {
    this.headerService.setHeader('Test Suite Dashboard', [
      { label: 'Projects', route: '/projects' },
      { label: 'Test Suite Dashboard', route: '/test-suites' }
    ]);

    this.searchControl.valueChanges.subscribe(() => {
      this.currentPage$.next(1);
    });
  }

  get currentPage(): number {
    return this.currentPage$.value;
  }

  onPageChange(page: number): void {
    this.currentPage$.next(page);
  }

  onCreateTestSuite(): void {
    this.router.navigate(['/test-suites/new']);
  }

  onEditTestSuite(suite: TestSuite): void {
    this.router.navigate(['/test-suites/edit', suite.id]);
  }

  onDeleteTestSuite(suite: TestSuite): void {
    console.log('Delete test suite:', suite.name);
  }
}
