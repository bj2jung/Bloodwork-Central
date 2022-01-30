export interface BloodPressureMeasurementRecord {
  RecordId: number;
  CreatedDate: string;
  ExamDate: string;
  SystolicMeasurement: number;
  DiastolicMeasurement: number;
  HeartRate: number;
  Description?: string;
}

export interface GetRecordsByPageResponse {
  PageIndex: number;
  Records: BloodPressureMeasurementRecord[];
  TotalPages: number;
}

export interface FormDataModel {
  recordId?: number;
  createdDate: string;
  examDate: string;
  systolicMeasurement: number;
  diastolicMeasurement: number;
  heartRate: number;
  description?: string;
}
