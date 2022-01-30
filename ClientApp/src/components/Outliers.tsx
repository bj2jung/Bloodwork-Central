import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { Button, Slider, Spin, Table } from "antd";
import { getOutlierRecords } from "../actions/api";
import { TABLE_COLUMNS } from "./TableComponent";
import { BloodPressureMeasurementRecord } from "../models/Models";

function Outliers() {
  const sliderRef = useRef();
  const [records, setRecords] = useState<BloodPressureMeasurementRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFindOutliers = async () => {
    setIsLoading(true);
    // @ts-ignore
    const threshold = sliderRef.current.state.value;
    const response = await getOutlierRecords(threshold);

    if (response) {
      setRecords(
        response.map((record: BloodPressureMeasurementRecord) => ({
          key: record.RecordId,
          ...record,
        }))
      );
      setIsLoading(false);
    }
  };

  return (
    <>
      <Slider min={1} max={99} ref={sliderRef} />
      <Button type="primary" onClick={() => handleFindOutliers()}>
        Find Outliers
      </Button>
      {isLoading ? (
        <Spin />
      ) : (
        <Table
          columns={TABLE_COLUMNS}
          pagination={false}
          dataSource={records}
        ></Table>
      )}
    </>
  );
}

export default connect()(Outliers);
