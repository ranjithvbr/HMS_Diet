import React from "react";
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
// import Dialog from "@material-ui/core/Dialog";
import View from "../../Images/view.PNG";
import "./DeliveriesTable.css";
import DeliveriesModal from "./DeliveriesModal";

export default class DeliveriesTable extends React.Component {
  state = {
    openview: "",
    props_loading: false,
  };

  createData = (parameter) => {
    var keys = Object.keys(parameter);
    var values = Object.values(parameter);

    var returnobj = {};

    for (var i = 0; i < keys.length; i++) {
      returnobj[keys[i]] = values[i];
    }
    return returnobj;
  };

  // modelopen = (data) => {
  //   if (data === "view") {
  //     this.setState({ openview: true });
  //   } else if (data === "edit") {
  //     this.setState({ editopen: true });
  //   }
  // };

  // closemodal = () => {
  //   this.setState({ openview: false, editopen: false });
  // };

  render() {
    // var tableDatas=this.props.tableDatas;
    const styles = "";
    const { classes, onClose, cancel, selectedValue, ...other } = this.props;
    var tableData = this.props.tableData;
    return (
      <div>
        {/* <Tablecomponent
          heading={[
            { id: "sno", label: "S.No" },
            { id: "customer", label: "Customer" },
            { id: "pack", label: "Package" },
            { id: "address", label: "Address" },
            { id: "phone_number", label: "Phone Number " },
            { id: "total_days", label: "Total Days" },
            { id: "action", label: "Action" },
          ]}
          rowdata={tableData}
          // rowdata={tableData.length ===  0 ? []: tableData}
          tableicon_align={""}
          modelopen={(e) => this.modelopen(e)}
          EditIcon="close"
          DeleteIcon="close"
          Workflow="close"
          props_loading={this.state.props_loading}
        />

        <DeliveriesModal
          clrchange
          open={this.state.openview}
          closemodal={(e) => this.closemodal(e)}
          xswidth={"md"}
        />

        <Modalcomp
          visible={this.state.editopen}
          title={"Edit details"}
          closemodal={(e) => this.closemodal(e)}
          xswidth={"xs"}
        ></Modalcomp> */}
      </div>
    );
  }
}
