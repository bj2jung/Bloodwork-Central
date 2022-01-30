import * as React from "react";
import { connect } from "react-redux";
import RecordsTable from './RecordsTable'

const Home = () => (
  <div>
        <RecordsTable />
  </div>
);

export default connect()(Home);
