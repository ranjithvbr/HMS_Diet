import React from "react";
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
// import Dialog from "@material-ui/core/Dialog";
import View from "../../Images/view.PNG";
import "./TotalOrderTable.css";
import TotalOrderModal from "./TotalOrderModal";
import ViewTotalOrder from "./ViewTotalOrder"; 
// import { apiurl } from "../../App";
import axios from "axios"; import dateFormat from "dateformat";
const current_date = dateFormat(new Date(), "yyyy-mm-dd");



export default class TotalOrderTable extends React.Component {
  state = {
    openview: "",
    vendorId:12,
    from_date: current_date,
    to_date: current_date,
    tableData:[],
    responseAllData:[],
    view_data:[]
  };

  componentDidMount() {
    this.getTableData();
  }

  componentWillReceiveProps() {
    console.log(this.props, "getdatacall");
    
    if (this.props.reload ==true) {
      this.setState({
        from_date:this.props.fromDate,
        to_date:this.props.to_date
      })
      this.getTableData();
    }
  }

  createData = (parameter) => {
    var keys = Object.keys(parameter);
    var values = Object.values(parameter);

    var returnobj = {};

    for (var i = 0; i < keys.length; i++) {
      returnobj[keys[i]] = values[i];
    }
    return returnobj;
  };

  modelopen = (data) => {
    if (data === "view") {
      this.setState({ openview: true });
    } else if (data === "edit") {
      this.setState({ editopen: true });
    }
  };



  render() {
    const styles = "";
    const { classes, onClose, cancel, selectedValue, ...other } = this.props;
    return (
      <div> 
        <ViewTotalOrder open={this.state.openview} onClose={this.closemodal} />

        <Modalcomp
          clrchange="text_color"
          visible={this.state.editopen}
          title={"Edit details"}
          closemodal={(e) => this.closemodal(e)}
          xswidth={"xs"}
        >

        </Modalcomp>
      </div>
    );
  }
}
