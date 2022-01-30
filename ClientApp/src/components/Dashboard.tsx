import React, { useState, useEffect, ReactElement, useRef } from "react";
import { connect } from "react-redux";
import {
  addRecord,
  deleteRecord,
  generateRecords,
  getRecordsByPage,
  updateRecord,
} from "../actions/api";
import { FormDataModel, GetRecordsByPageResponse } from "../models/Models";
import { Button, Slider } from "antd";
import TableComponent from "./TableComponent";
import ModalComponent from "./ModalComponent";
import BloodPressureForm from "./BloodPressureForm";

function DashBoard() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<GetRecordsByPageResponse>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalHeader, setModalHeader] = useState<string>("");
  const [modalContent, setModalContent] = useState<ReactElement>();
  const sliderRef = useRef();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data: GetRecordsByPageResponse = await getRecordsByPage(currentPage);
    setData(data);
    setIsLoading(false);
  };

  const handleClickDetails = (id: number) => {
    const selectedRecord = data!.Records.find(
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
    const selectedRecord = data!.Records.find(
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
      getData();
    }

    setShowModal(false);
  };

  const handleClickDelete = async (id: number) => {
    const response = await deleteRecord(id);
    if (response) {
      getData();
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
      getData();
    }
    setShowModal(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    getData();
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

  const handleGenerateRecords = () => {
    // @ts-ignore
    const count = sliderRef.current.state.value;

    generateRecords(count);

    setShowModal(false);
  };

  const handleModalCancel = () => {
    setShowModal(false);
  };

  return (
    <>
      <Button type="primary" onClick={() => handleClickAddRecord()}>
        Add Record
      </Button>
      {!isLoading && (
        <TableComponent
          data={data}
          currentPage={currentPage}
          handleClickDetails={handleClickDetails}
          handleClickUpdate={handleClickUpdate}
          handleClickDelete={handleClickDelete}
          onPageChange={handlePageChange}
        />
      )}
      <Button type="primary" onClick={() => handleClickGenerateRecords()}>
        Generate Records
      </Button>
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
