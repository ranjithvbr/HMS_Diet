import React, { Component } from "react";

import Grid from "@material-ui/core/Grid";
import "./DashboardMaster.css";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import DashboardTable from "./DashboardTable";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Input, Select, Icon } from 'antd';
import Labelbox from '../../helpers/labelbox/labelbox'
import Paper from '@material-ui/core/Paper';


export default class DashboardMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  handleClickopen = () => {
    this.setState({ open: true });
  };
  handleClickclose = () => {
    this.setState({ open: false });
  };

  render() {
    const { Search } = Input;
 
    return (
      <div className="diet_dashboard">
        <Paper>
        <div className="uploadsmasterheader">
              <div className="diet_titleuser">DIET DASHBOARD</div>           
               
        </div> 
          
      
        <DashboardTable />
        </Paper>
        
      </div>
    );
  }
}
