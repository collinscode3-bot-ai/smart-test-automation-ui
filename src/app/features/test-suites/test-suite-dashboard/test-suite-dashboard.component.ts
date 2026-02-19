import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TestSuiteService } from '../../../core/services/test-suite.service';
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
  testSuites$: Observable<TestSuite[]>;
  searchControl = new FormControl('');

  constructor(
    private testSuiteService: TestSuiteService,
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
  }

  ngOnInit(): void {}

  onCreateTestSuite(): void {
    console.log('Create new test suite clicked');
  }

  onEditTestSuite(suite: TestSuite): void {
    console.log('Edit test suite:', suite.name);
  }

  onDeleteTestSuite(suite: TestSuite): void {
    console.log('Delete test suite:', suite.name);
  }
}
