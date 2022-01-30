import axios from "axios";
import {
  BloodPressureMeasurementRecord,
  FormDataModel,
} from "../models/Models";
import { GetRecordsByPageResponse } from "../models/Models";

const BASE_URL = "http://localhost:5000/api";

export const getRecordsByPage = async (
  pageIndex: number
): Promise<GetRecordsByPageResponse | null> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/bloodpressuremeasurement/page/${pageIndex}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAllRecords = async (): Promise<
  BloodPressureMeasurementRecord[] | null
> => {
  try {
    const response = await axios.get(`${BASE_URL}/bloodpressuremeasurement`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getOutlierRecords = async (
  threshold: number
): Promise<BloodPressureMeasurementRecord[] | null> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/bloodpressuremeasurement/outliers/${threshold}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateRecord = async (
  updatedForm: FormDataModel
): Promise<BloodPressureMeasurementRecord | null> => {
  try {
    const response = await axios.put(
      `${BASE_URL}/bloodpressuremeasurement/${updatedForm.recordId}`,
      createRecordModel(updatedForm)
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteRecord = async (
  recordId: number
): Promise<BloodPressureMeasurementRecord | null> => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/bloodpressuremeasurement/${recordId}`
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const addRecord = async (
  form: FormDataModel
): Promise<BloodPressureMeasurementRecord | null> => {
  try {
    const response = await axios.post(
      `${BASE_URL}/bloodpressuremeasurement`,
      createRecordModel(form)
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const generateRecords = async (
  count: number
): Promise<boolean | null> => {
  try {
    await axios.post(`${BASE_URL}/bloodpressuremeasurement/generaterecords`, {
      count,
    });

    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const createRecordModel = (form: FormDataModel) => {
  return {
    RecordId: form.recordId,
    CreatedDate: form.createdDate,
    ExamDate: form.examDate,
    SystolicMeasurement: form.systolicMeasurement,
    DiastolicMeasurement: form.diastolicMeasurement,
    HeartRate: form.heartRate,
    Description: form.description,
  };
};
