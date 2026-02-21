export interface VerificationParam {
  sequence: number;
  key: string;
  valuePath: string;
  valueSource: string;
  dataType: string;
  value: string;
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
