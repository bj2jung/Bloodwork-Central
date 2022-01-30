import axios from "axios";
import { FormDataModel } from "../models/Models";
import { GetRecordsByPageResponse } from "../models/Models";

// const BASE_URL = "https://localhost:44318/api";
const BASE_URL = "http://localhost:5000/api";

export const getRecordsByPage = async (
  pageIndex: number
): Promise<GetRecordsByPageResponse> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/bloodpressuremeasurement/page/${pageIndex}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateRecord = async (updatedForm: FormDataModel) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/bloodpressuremeasurement/${updatedForm.recordId}`,
      createRecord(updatedForm)
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteRecord = async (recordId: number) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/bloodpressuremeasurement/${recordId}`
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const addRecord = async (form: FormDataModel) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/bloodpressuremeasurement`,
      createRecord(form)
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const generateRecords = async (count: number) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/bloodpressuremeasurement/generaterecords`,
      {
        count,
      }
    );

    return response;
  } catch (error) {}
};

const createRecord = (form: FormDataModel) => {
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
