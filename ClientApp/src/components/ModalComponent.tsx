import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  BloodPressureMeasurementRecord,
  GetRecordsByPageResponse,
} from "../models/Models";
import { Modal } from "antd";

interface Props {
  showModal: boolean;
  children?: any;
  handleModalCancel: Function;
  modalHeader: string;
}

function ModalComponent(props: Props) {
  return (
    <>
      <Modal
        title={props.modalHeader}
        visible={props.showModal}
        onCancel={() => props.handleModalCancel()}
        footer={null}
      >
        {props.children}
      </Modal>
    </>
  );
}

export default connect()(ModalComponent);
