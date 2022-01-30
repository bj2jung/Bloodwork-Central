import * as React from "react";
import { connect } from "react-redux";
import RecordsTable from "../components/Dashboard";

const Home = () => (
  <div>
    <RecordsTable />
  </div>
);

export default connect()(Home);
