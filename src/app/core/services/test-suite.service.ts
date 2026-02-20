import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TestSuite } from '../models/test-suite.model';

@Injectable({
  providedIn: 'root'
})
export class TestSuiteService {
  private testSuites: TestSuite[] = [
    { id: '1', name: 'Global Logistics API Suite', description: 'API testing for global logistics.', type: 'Service Testing', testCases: [] },
    { id: '2', name: 'Mobile Checkout Flow E2E', description: 'E2E testing for mobile checkout.', type: 'E2E Testing', testCases: [] },
    { id: '3', name: 'Carrier Gateway Integration', description: 'Integration testing for carrier gateway.', type: 'Neighbour Testing', testCases: [] },
    { id: '4', name: 'User Authentication Suite', description: 'Tests for user login and signup.', type: 'Service Testing', testCases: [] },
    { id: '5', name: 'Inventory Management E2E', description: 'Full flow testing for inventory.', type: 'E2E Testing', testCases: [] },
    { id: '6', name: 'Payment Gateway Mock', description: 'Mock tests for payment gateway.', type: 'Neighbour Testing', testCases: [] },
    { id: '7', name: 'Shipping Label Generator', description: 'Tests for label generation.', type: 'Service Testing', testCases: [] },
    { id: '8', name: 'Customer Support Portal E2E', description: 'E2E for support portal.', type: 'E2E Testing', testCases: [] }
  ];

  getTestSuites(): Observable<TestSuite[]> {
    return of(this.testSuites);
  }

  /**
   * Fetches a single test suite by ID.
   * @param id The ID of the test suite to fetch.
   */
  getTestSuiteById(id: string): Observable<TestSuite | undefined> {
    const suite = this.testSuites.find(s => s.id === id);
    return of(suite);
  }

  /**
   * Creates a new test suite.
   * @param suite The test suite data to create.
   */
  createTestSuite(suite: TestSuite): Observable<TestSuite> {
    const newSuite = { ...suite, id: Math.random().toString(36).substr(2, 9) };
    this.testSuites.unshift(newSuite);
    return of(newSuite);
  }

  /**
   * Updates an existing test suite.
   * @param id The ID of the test suite to update.
   * @param suite The updated test suite data.
   */
  updateTestSuite(id: string, suite: Partial<TestSuite>): Observable<TestSuite | undefined> {
    const index = this.testSuites.findIndex(s => s.id === id);
    if (index !== -1) {
      this.testSuites[index] = { ...this.testSuites[index], ...suite };
      return of(this.testSuites[index]);
    }
    return of(undefined);
  }
}
