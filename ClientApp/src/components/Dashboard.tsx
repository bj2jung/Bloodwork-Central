import React, { useState, useEffect, ReactElement, useRef } from "react";
import { connect } from "react-redux";
import {
  addRecord,
  deleteRecord,
  generateRecords,
  getAllRecords,
  getRecordsByPage,
  updateRecord,
} from "../actions/api";
import {
  BloodPressureMeasurementRecord,
  FormDataModel,
  GetRecordsByPageResponse,
} from "../models/Models";
import { Button, Slider, notification, Spin } from "antd";
import TableComponent from "./TableComponent";
import ChartComponent from "./ChartComponent";
import ModalComponent from "./ModalComponent";
import Outliers from "./Outliers";
import BloodPressureForm from "./BloodPressureForm";

function DashBoard() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isTableLoading, setIsTableLoading] = useState<boolean>(true);
  const [tableData, setTableData] = useState<GetRecordsByPageResponse>();
  const [isChartLoading, setIsChartLoading] = useState<boolean>(true);
  const [chartData, setChartData] =
    useState<BloodPressureMeasurementRecord[]>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalHeader, setModalHeader] = useState<string>("");
  const [modalContent, setModalContent] = useState<ReactElement>();
  const sliderRef = useRef();

  useEffect(() => {
    getTableData();
    getChartData();
  }, []);

  const getTableData = async () => {
    const tableData: GetRecordsByPageResponse | null = await getRecordsByPage(
      currentPage
    );

    if (!tableData) {
      showServerError();
      setIsTableLoading(false);
      return;
    }

    setTableData(tableData);
    setIsTableLoading(false);
  };

  const getChartData = async () => {
    const chartData: BloodPressureMeasurementRecord[] | null =
      await getAllRecords();

    if (!chartData) {
      showServerError();
      setIsChartLoading(false);
      return;
    }

    setChartData(chartData);
    setIsChartLoading(false);
  };

  const handleClickDetails = (id: number) => {
    const selectedRecord = tableData!.Records.find(
      (record) => record.RecordId == id
    );

    setModalHeader("Record Details");
    setModalContent(
      <BloodPressureForm
        showModal={showModal}
        prefilled
        disabled
        record={selectedRecord}
        submitForm={() => {}}
      />
    );
    setShowModal(true);
  };

  const handleClickUpdate = (id: number) => {
    const selectedRecord = tableData!.Records.find(
      (record) => record.RecordId == id
    );

    setModalHeader("Update Record");
    setModalContent(
      <BloodPressureForm
        showModal={showModal}
        prefilled
        record={selectedRecord}
        submitForm={handleRecordUpdate}
      />
    );
    setShowModal(true);
  };

  const handleRecordUpdate = async (form: FormDataModel) => {
    const response = await updateRecord(form);
    if (response) {
      getTableData();
    } else {
      showServerError();
    }

    setShowModal(false);
  };

  const handleClickDelete = async (id: number) => {
    const response = await deleteRecord(id);
    if (response) {
      getTableData();
    } else {
      showServerError();
    }
  };

  const handleClickAddRecord = () => {
    setModalHeader("Add Record");
    setModalContent(
      <BloodPressureForm showModal={showModal} submitForm={handleAddRecord} />
    );
    setShowModal(true);
  };

  const handleAddRecord = async (form: FormDataModel) => {
    const response = await addRecord(form);
    if (response) {
      getTableData();
    } else {
      showServerError();
    }
    setShowModal(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    getTableData();
  }, [currentPage]);

  const handleClickGenerateRecords = () => {
    setModalHeader("Generate Records");
    setModalContent(
      <>
        Count
        <Slider min={1} max={100} ref={sliderRef} />
        <Button type="primary" onClick={() => handleGenerateRecords()}>
          Generate
        </Button>
      </>
    );
    setShowModal(true);
  };

  const handleGenerateRecords = async () => {
    // @ts-ignore
    const count = sliderRef.current.state.value;

    const response = await generateRecords(count);

    if (response) {
      getTableData();
    } else {
      showServerError();
    }

    setShowModal(false);
  };

  const handleClickFindOutliers = () => {
    setModalHeader("Find outliers");
    setModalContent(
      <>
        <Outliers />
      </>
    );
    setShowModal(true);
  };

  const handleModalCancel = () => {
    setShowModal(false);
  };

  const showServerError = () => {
    notification.open({
      placement: "bottomRight",
      type: "error",
      message: "Server Error",
    });
  };

  return (
    <>
      <Button type="primary" onClick={() => handleClickAddRecord()}>
        Add Record
      </Button>
      <Button type="primary" onClick={() => handleClickGenerateRecords()}>
        Generate Random Records
      </Button>
      <Button type="primary" onClick={() => handleClickFindOutliers()}>
        Find Outliers
      </Button>
      {isTableLoading ? (
        <Spin />
      ) : (
        <TableComponent
          data={tableData}
          currentPage={currentPage}
          handleClickDetails={handleClickDetails}
          handleClickUpdate={handleClickUpdate}
          handleClickDelete={handleClickDelete}
          onPageChange={handlePageChange}
        />
      )}
      {isChartLoading ? <Spin /> : <ChartComponent data={chartData} />}
      <ModalComponent
        showModal={showModal}
        handleModalCancel={handleModalCancel}
        modalHeader={modalHeader}
      >
        {modalContent}
      </ModalComponent>
    </>
  );
}

export default connect()(DashBoard);
