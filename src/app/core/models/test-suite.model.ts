import { TestCase } from './test-case.model';

export interface TestSuite {
  id: string;
  name: string;
  description: string;
  type: string;
  testCases: TestCase[];
}
