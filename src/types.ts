export interface MessageResponse {
  message: string;
}

export interface ErrorProp {
  value: string;
  msg: string;
}
export interface ValidationErrors {
  [key: string]: ErrorProp;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface CitizenDto {
  id: string;
  givenName: string;
  documentType: string;
  documentVersion: string;
  documentNumber: string;
  localOfRequest: string;
  issuingEntity: string;
  validityBeginDate: Date;
  validityEndDate: Date;
  documentPan: string;
  civilianIdNumber: string;
  taxNo: string;
  socialSecurityNumber: string;
  healthNumber: string;
  parents: string;
  givenNameFather: string;
  givenNameMother: string;
  accidentalIndications: string;
  nationality: string;
  country: string;
  dateOfBirth: Date;
  height: string;
  gender: string;
  mRz1: string;
  mRz2: string;
  mRz3: string;
  base64Image: string;
  forgotten: boolean;
  created: Date;
  requiredChangePassword: boolean;
  activationCode: string;
}
