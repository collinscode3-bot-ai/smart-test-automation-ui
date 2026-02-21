export interface ErrorConfiguration {
  expectedOutcome: string;
  errorCode: string;
  errorMessage: string;
}

export interface ValidationParameter {
  seqNo: number;
  type: string;
  value: string;
  dataType: string;
}

export interface Validation {
  id?: string;
  sequenceNo: string;
  validationName: string;
  payloadId: string;
  payloadFormat: string;
  validationType: string;
  validationSourceData: string;
  errorConfigurations: ErrorConfiguration[];
  parameters: ValidationParameter[];
}
