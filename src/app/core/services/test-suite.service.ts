import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TestSuite } from '../models/test-suite.model';

@Injectable({
  providedIn: 'root'
})
export class TestSuiteService {
  private testSuites: TestSuite[] = [
    { name: 'Global Logistics API Suite', description: 'API testing for global logistics.', type: 'Service Testing', testCases: [] },
    { name: 'Mobile Checkout Flow E2E', description: 'E2E testing for mobile checkout.', type: 'E2E Testing', testCases: [] },
    { name: 'Carrier Gateway Integration', description: 'Integration testing for carrier gateway.', type: 'Neighbour Testing', testCases: [] },
    { name: 'User Authentication Suite', description: 'Tests for user login and signup.', type: 'Service Testing', testCases: [] },
    { name: 'Inventory Management E2E', description: 'Full flow testing for inventory.', type: 'E2E Testing', testCases: [] },
    { name: 'Payment Gateway Mock', description: 'Mock tests for payment gateway.', type: 'Neighbour Testing', testCases: [] },
    { name: 'Shipping Label Generator', description: 'Tests for label generation.', type: 'Service Testing', testCases: [] },
    { name: 'Customer Support Portal E2E', description: 'E2E for support portal.', type: 'E2E Testing', testCases: [] }
  ];

  getTestSuites(): Observable<TestSuite[]> {
    return of(this.testSuites);
  }
}
