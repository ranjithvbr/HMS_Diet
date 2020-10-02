import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from "../src/components/Diet_login/Login";
import Forgot from "../src/components/Diet_login/Forgot";
import ResetPassword from "../src/components/Diet_login/ResetPassword";
import MiniDrawer from "./components/Drawer page/Drawerpage";
import PaymentMethod from "./components/CancelPayment/PaymentMethod";
import "./commonstyles.css";

export const apiurl = "http://52.200.251.222:8158/api/v1/";
export default class App extends Component {
  state = { test: false };
  render() {
    return (
      <div>
        <Router basename="dietmodule/?/">
          <Route path="/" component={Login} exact />
          <Route path={"/Forgotpassword"} component={Forgot} />
          <Route path="/ResetPassword" component={ResetPassword} />
          <Route path="/Home" component={MiniDrawer} />
          <Route path="/payment" component={PaymentMethod} exact />
        </Router>
      </div>
    );
  }
}
