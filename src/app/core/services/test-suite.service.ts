import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TestSuite } from '../models/test-suite.model';

@Injectable({
  providedIn: 'root'
})
export class TestSuiteService {
  private testSuites: TestSuite[] = [
    {
      name: 'Global Logistics API Suite',
      description: 'Manage and monitor your existing automated testing suites.',
      type: 'Service Testing',
      testCases: []
    },
    {
      name: 'Mobile Checkout Flow E2E',
      description: 'Manage and monitor your existing automated testing suites.',
      type: 'E2E Testing',
      testCases: []
    },
    {
      name: 'Carrier Gateway Integration',
      description: 'Manage and monitor your existing automated testing suites.',
      type: 'Neighbour Testing',
      testCases: []
    }
  ];

  getTestSuites(): Observable<TestSuite[]> {
    return of(this.testSuites);
  }
}
