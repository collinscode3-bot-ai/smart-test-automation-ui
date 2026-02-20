export interface TestSuite {
  id: string;
  name: string;
  description: string;
  type: string;
  testCases: any[]; // Define a more specific type if needed later
}
