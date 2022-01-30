import * as React from "react";
import { Route } from "react-router";
import Layout from "./components/Layout";
import Home from "./components/Home";
import AddRecord from "./components/AddRecord";

import "./custom.css";

export default () => (
  <Layout>
    <Route exact path="/" component={Home} />
    <Route path="/addRecord" component={AddRecord} />
    {/*<Route path='/fetch-data/:startDateIndex?' component={FetchData} />*/}
  </Layout>
);
