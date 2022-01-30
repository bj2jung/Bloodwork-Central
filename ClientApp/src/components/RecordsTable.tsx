import React, { useState, useEffect, ReactElement, useRef } from "react";
import { connect } from "react-redux";
import {
  addRecord,
  deleteRecord,
  generateRecords,
  getRecordsByPage,
  updateRecord,
} from "../actions/api";
import {
  BloodPressureMeasurementRecord,
  FormDataModel,
  GetRecordsByPageResponse,
} from "../models/Models";
import { Button, Input, Slider } from "antd";
import TableComponent from "./TableComponent";
import ModalComponent from "./ModalComponent";
import BloodPressureForm from "./BloodPressureForm";

const RecordsTable: React.FC = () => {
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

      {/* {!isLoading && generateTable(records)} */}
      {/* {!isLoading && generatePaginationMenu(totalPages, currentPage)} */}
    </>
  );
};

// const generateTable = (records: BloodPressureMeasurementRecord[]) => {
//   const tableData = records.map((record) => ({
//     key: record.RecordId,
//     ...record,
//   }));

//   const columns = [
//     {
//       title: "#",
//       dataIndex: "RecordId",
//       key: "RecordId",
//     },
//     {
//       title: "Date",
//       dataIndex: "Date",
//       key: "Date",
//     },
//     {
//       title: "Reading 1",
//       dataIndex: "Reading1",
//       key: "Reading1",
//     },
//     {
//       title: "Reading 2",
//       dataIndex: "Reading2",
//       key: "Reading2",
//     },
//     {
//       title: "Action",
//       key: "action",
//       render: (record: BloodPressureMeasurementRecord) => (
//         <Space size="middle">
//           <Button onClick={() => console.log(record.RecordId)}>
//             See Details
//           </Button>
//           <Button>Update</Button>
//           <Button>Delete</Button>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <Table
//       columns={columns}
//       pagination={{ position: ["bottomRight"] }}
//       dataSource={tableData}
//     />
//   );
// };

// const generateTableData = (
//   records: BloodPressureMeasurementRecord[],
//   viewDetailFn: Function
// ) => {
//   const dataSource = records.map((record) => ({
//     key: record.RecordId,
//     ...record,
//   }));

//   const columns = [
//     {
//       title: "#",
//       dataIndex: "RecordId",
//       key: "RecordId",
//     },
//     {
//       title: "Date",
//       dataIndex: "Date",
//       key: "Date",
//     },
//     {
//       title: "Reading 1",
//       dataIndex: "Reading1",
//       key: "Reading1",
//     },
//     {
//       title: "Reading 2",
//       dataIndex: "Reading2",
//       key: "Reading2",
//     },
//     {
//       title: "Action",
//       key: "action",
//       render: (record: BloodPressureMeasurementRecord) => (
//         <Space size="middle">
//           <Button onClick={viewDetailFn(record.RecordId)}>See Details</Button>
//           <Button>Update</Button>
//           <Button>Delete</Button>
//         </Space>
//       ),
//     },
//   ];

//   return { dataSource, columns };
// };

// const generatePaginationMenu = (totalPages: number, currentPage: number) => {
//   const pages = [];
//   for (let i = 1; i <= totalPages; i++) {
//     pages.push(
//       <PaginationItem key={i}>
//         <PaginationLink href="#">{i}</PaginationLink>
//       </PaginationItem>
//     );
//   }

//   return (
//     <Pagination>
//       <PaginationItem>
//         <PaginationLink href="#" previous />
//       </PaginationItem>
//       {pages}
//       <PaginationItem>
//         <PaginationLink href="#" next />
//       </PaginationItem>
//     </Pagination>
//   );
// };

export default connect()(RecordsTable);
