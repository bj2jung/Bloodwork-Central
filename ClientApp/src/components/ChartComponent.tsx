import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { BloodPressureMeasurementRecord } from "../models/Models";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  data?: BloodPressureMeasurementRecord[];
}

const SYSTOLIC = "Systolic Pressure";
const DIASTOLIC = "Diastolic Pressure";

function ChartComponent(props: Props) {
  const [systolicDataset, setSystolicDataset] = useState<any>();
  const [diastolicDataset, setDialstolicDataset] = useState<any>();

  useEffect(() => {
    if (props.data) {
      setSystolicDataset(createDataset(SYSTOLIC));
      setDialstolicDataset(createDataset(DIASTOLIC));
    }
  }, [props.data]);

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Record Summary",
      },
    },
  };

  return (
    <>
      {props.data && (
        <Line
          options={options}
          data={{
            labels,
            datasets: [systolicDataset, diastolicDataset],
          }}
        />
      )}
    </>
  );
}

function createDataset(description: string) {
  return {
    label: description,
    data: [65, 59, 80, 81, 56, 55, 40],
    fill: false,
    borderColor:
      description == SYSTOLIC ? "rgb(75, 192, 192)" : "rgb(235, 63, 63)",
    tension: 0.1,
  };
}

export default connect()(ChartComponent);
