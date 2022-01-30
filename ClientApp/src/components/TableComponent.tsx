import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  BloodPressureMeasurementRecord,
  GetRecordsByPageResponse,
} from "../models/Models";
import { Table, Space, Button, Pagination } from "antd";

const RECORDS_PER_PAGE = 5;

interface Props {
  data?: GetRecordsByPageResponse;
  handleClickDetails: Function;
  handleClickUpdate: Function;
  handleClickDelete: Function;
  currentPage: number;
  onPageChange: Function;
}

export const TABLE_COLUMNS = [
  {
    title: "Created Date",
    dataIndex: "CreatedDate",
    key: "CreatedDate",
  },
  {
    title: "Description",
    dataIndex: "Description",
    key: "Description",
  },
  {
    title: "Systolic",
    dataIndex: "SystolicMeasurement",
    key: "SystolicMeasurement",
  },
  {
    title: "Diastolic",
    dataIndex: "DiastolicMeasurement",
    key: "DiastolicMeasurement",
  },
  {
    title: "Heart Rate",
    dataIndex: "HeartRate",
    key: "HeartRate",
  },
];

function TableComponent(props: Props) {
  const [records, setRecords] = useState<BloodPressureMeasurementRecord[]>([]);

  useEffect(() => {
    setRecords(
      props.data!.Records.map((record) => ({
        key: record.RecordId,
        ...record,
      }))
    );
  }, [props.data]);

  const columns = [
    ...TABLE_COLUMNS,
    {
      title: "Action",
      key: "action",
      render: (record: BloodPressureMeasurementRecord) => (
        <Space size="middle">
          <Button onClick={() => props.handleClickDetails(record.RecordId)}>
            Details
          </Button>
          <Button onClick={() => props.handleClickUpdate(record.RecordId)}>
            Update
          </Button>
          <Button onClick={() => props.handleClickDelete(record.RecordId)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} pagination={false} dataSource={records} />
      <Pagination
        total={props.data!.TotalPages * RECORDS_PER_PAGE}
        pageSize={RECORDS_PER_PAGE}
        onChange={(page) => props.onPageChange(page)}
      />
    </>
  );
}

export default connect()(TableComponent);
