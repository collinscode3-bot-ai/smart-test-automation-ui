export interface TestCaseContract {
  id: string;
  name: string;
  type: string;
}

export interface TestCase {
  id: string;
  name: string;
  description: string;
  contracts: TestCaseContract[];
  verifications?: any[];
}
