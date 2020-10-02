import React from "react";
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";

import "./TodaysPreparationTable.css";

export default class TodaysPreparationTable extends React.Component {
  state = {
    openview: false,
    props_loading:false
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

  modelopen = (data) => {
    if (data === "view") {
      this.setState({ openview: true });
    } else if (data === "edit") {
      this.setState({ editopen: true });
    }
  };

  closemodal = () => {
    this.setState({ openview: false, editopen: false });
  };

  render() {
    return (
      <div>
        {/* <Tablecomponent
          heading={[
            { id: "", label: "S.No" },
            { id: "order", label: "Order" },
            { id: "instruction", label: "Instruction" },
            { id: "quantity", label: "Quantity" },
          ]}
          rowdata={this.props.tableData}
          tableicon_align={""}
          modelopen={(e) => this.modelopen(e)}
          actionclose="close"
          props_loading={this.state.props_loading}
        />

        <Modalcomp
          visible={this.state.openview}
          title={"View details"}
          closemodal={(e) => this.closemodal(e)}
          xswidth={"xs"}
        ></Modalcomp>

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
