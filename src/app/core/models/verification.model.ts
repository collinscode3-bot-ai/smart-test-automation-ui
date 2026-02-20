export interface VerificationParam {
  sequence: number;
  key: string;
}

export interface VerificationDetails {
  id?: string;
  appName: string;
  serviceName: string;
  sequenceNo: string;
  verificationParamsType: string;
  baseUrl: string;
  verifyIfPreviousSuccess: boolean;
  isCompositeKey: boolean;
  delimiter: string;
  parameters: VerificationParam[];
}
