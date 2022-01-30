import React, { useEffect } from "react";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import { Form, Input, Button } from "antd";
import { BloodPressureMeasurementRecord } from "../models/Models";
import { FormDataModel } from "../models/Models";

interface Props {
  disabled?: boolean;
  prefilled?: boolean;
  record?: BloodPressureMeasurementRecord;
  showModal?: boolean;
  submitForm: Function;
}

function BloodPressureForm(props: Props) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (props.record) {
      form.setFieldsValue({
        createdDate: props.record!.CreatedDate,
        examDate: props.record!.ExamDate,
        systolicMeasurement: props.record!.SystolicMeasurement,
        diastolicMeasurement: props.record!.DiastolicMeasurement,
        heartRate: props.record!.HeartRate,
        description: props.record!.Description,
      });
    } else {
      form.resetFields();
    }
  }, [props.record]);

  const dateValidator = (_: any, value: string) => {
    if (!value) {
      return Promise.reject(new Error("Validation Failed"));
    }

    if (value.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Validation Failed"));
  };

  const numberValidator = (_: any, value: string) => {
    if (!value) {
      return Promise.reject(new Error("Validation Failed"));
    }

    if (Number(value)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Validation Failed"));
  };

  const handleSubmitForm = () => {
    const newRecordData: FormDataModel = {
      createdDate: form.getFieldValue("createdDate"),
      examDate: form.getFieldValue("examDate"),
      systolicMeasurement: form.getFieldValue("systolicMeasurement"),
      diastolicMeasurement: form.getFieldValue("diastolicMeasurement"),
      heartRate: form.getFieldValue("heartRate"),
      description: form.getFieldValue("description"),
    };
    if (props.record) {
      newRecordData.recordId = props.record!.RecordId;
    }
    props.submitForm(newRecordData);
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 12 }}
      wrapperCol={{ span: 12 }}
      layout="horizontal"
      onFinish={() => handleSubmitForm()}
    >
      <Form.Item
        name="createdDate"
        label="Created Date (YYYY-MM-DD)"
        validateTrigger="onBlur"
        rules={[
          {
            required: true,
            validator: dateValidator,
            message: "Must be in the format: YYYY-MM-DD",
          },
        ]}
      >
        <Input disabled={props.disabled} />
      </Form.Item>
      <Form.Item
        name="examDate"
        label="Exam Date (YYYY-MM-DD)"
        validateTrigger="onBlur"
        rules={[
          {
            required: true,
            validator: dateValidator,
            message: "Must be in the format: YYYY-MM-DD",
          },
        ]}
      >
        <Input disabled={props.disabled} />
      </Form.Item>

      <Form.Item
        name="systolicMeasurement"
        label="Systolic"
        validateTrigger="onBlur"
        rules={[
          {
            required: true,
            validator: numberValidator,
            message: "Must be a number",
          },
        ]}
      >
        <Input disabled={props.disabled} />
      </Form.Item>
      <Form.Item
        name="diastolicMeasurement"
        label="Diastolic"
        validateTrigger="onBlur"
        rules={[
          {
            required: true,
            validator: numberValidator,
            message: "Must be a number",
          },
        ]}
      >
        <Input disabled={props.disabled} />
      </Form.Item>
      <Form.Item
        name="heartRate"
        label="Heart Rate"
        validateTrigger="onBlur"
        rules={[
          {
            required: true,
            validator: numberValidator,
            message: "Must be a number",
          },
        ]}
      >
        <Input disabled={props.disabled} />
      </Form.Item>

      <Form.Item name="description" label="Description">
        <Input disabled={props.disabled} />
      </Form.Item>
      {!props.disabled && (
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            {props.prefilled ? "Update Record" : "Add Record"}
          </Button>
        </Form.Item>
      )}
    </Form>
  );
}

export default connect()(BloodPressureForm);
