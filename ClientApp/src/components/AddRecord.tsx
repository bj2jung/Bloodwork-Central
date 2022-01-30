import * as React from "react";
import { connect } from "react-redux";
import BloodPressureForm from "./BloodPressureForm";

const AddRecord = () => (
  <>
    <BloodPressureForm />
  </>
);

export default connect()(AddRecord);
