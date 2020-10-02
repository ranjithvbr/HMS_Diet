import React, { Component } from "react";
import plus from "../../Images/plus.png";
import Grid from "@material-ui/core/Grid";
import "./ManageMaster.css";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import ManageModal from "./ManageModal";
import ManageTable from "./ManageTable";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { Input, Select, Icon } from "antd";
import dateFormat from "dateformat";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import ViewDetails from "../../components/Manage/ViewDetails";
import Add_Diet_Plan from "../../components/Manage/Add_Diet_Plan";
import axios from "axios";
import { apiurl } from "../../App";
import DeleteMedia from "./DeleteMedia";
import "./ManageTable.css";
import { Paper } from "@material-ui/core";

const current_date = dateFormat(new Date(), "dd mmm yyyy");

export default class ManageMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,

      date: "rrr",
      refresh: false,
      currentDeleteId: null,
      openview: false,
      tableData: [],
      responseAllData: [],
      viewdata: [],
      editdata: [],
      packageDetail: [],
      search: null,
      vendorId: 12,
    };
  }
  searchChange = (e) => {
    this.setState({
      search: e.target.value,
    });
    this.setState({});
  };
  handleClickopen = () => {
    this.setState({ open: true });
  };
  handleClickclose = () => {
    this.setState({ open: false });
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

  componentDidMount() {
    this.getTableData();
  }

  componentWillReceiveProps() {
    console.log(this.props, "getdatacall");

    if (this.props.getdatacall) {
      this.getTableData();
    }
  }

  getTableData = () => {
    this.setState({props_loading:true})
    var self = this;
    axios({
      method: "POST", //get method
      url: apiurl + "Diet/getdietpackage",
      data: {
        dietvendorId: this.state.vendorId,
      },
    }).then((response) => {
      var tableData = [];
      var responseAllData = [];
      response.data.data.length > 0 &&
        response.data.data.map((val) => {
          tableData.push({
            package: val.diet_package_name,
            duration: val.diet_duration,
            cost: val.diet_price,
            id: val.dietpackageId,
          });
          responseAllData.push(val);
        });
      self.setState(
        {
          tableData: tableData,
          responseAllData: responseAllData,
          props_loading:false
        },
        () => console.log("pushed", tableData)
      );
    });
  };

  deleteDealLIst = () => {
    var self = this;
    axios({
      method: "DELETE",
      url: apiurl + "Diet/deletedietpackage",
      data: {
        packageId: this.state.currentDeleteId,
      },
    }).then((response) => {
      if (response.data.status == 0) {
        alert("Something went wrong!!");
      } else {
        self.getTableData();
      }
      self.setState({ open: false });
    });
  };

  modelopen = (data, id) => {
    console.log("id", id);
    console.log(data);
    if (data === "view") {
      var viewdata = this.state.responseAllData.filter((viewdata) => {
        return viewdata.dietpackageId === id;
      });
      this.setState({ openview: true, viewdata: viewdata[0] });
    } else if (data === "edit") {
      var editdata = this.state.responseAllData.filter((editdata) => {
        return editdata.dietpackageId === id;
      });
      this.setState({ editopen: true, editdata: editdata[0] });
    } else if (data == "delete") {
    }
  };

  closemodal = () => {
    // alert("gyhjm")
    this.setState({ openview: false, editopen: false });
  };

  deleteopen = (data, id) => {
    console.log("id1", id);
    this.setState({ openview: false, open: true, currentDeleteId: id });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    console.log(dateFormat(new Date(), "dd mmm yyyy"));
    const styles = "";
    const { classes, onClose, cancel, selectedValue, ...other } = this.props;
    const { Search } = Input;
    var searchData = [];
    searchData = this.state.tableData.filter((data) => {
      console.log(data, "Search_data");
      if (this.state.search === null) return data;
      else if (
        (data.package !== null &&
          data.package
            .toLowerCase()
            .includes(this.state.search.toLowerCase())) ||
        // (data.package != null &&
        //   data.package
        //     .toLowerCase()
        //     .includes(this.state.search.toLowerCase())) ||
        // (data.date != null &&
        //   data.date.toString().includes(this.state.search.toString())) ||
        (data.duration != null &&
          data.duration.toString().includes(this.state.search.toString())) ||
        // (data.cash != null &&
        //   data.cash.toString().includes(this.state.search.toString())) ||
        // (data.cost != null &&
        //   data.cost.toString().includes(this.state.search.toString())) ||
        // (data.wallet != null &&
        //   data.wallet.toString().includes(this.state.search.toString())) ||
        (data.cost != null &&
          data.cost.toString().includes(this.state.search.toString()))
      ) {
        return data;
      }
    });

    return (
      <div>
        <Paper>
          <div className="manage_header">
            <div className="manage_title">MANAGE PACKAGE</div>

            <div className="manage_container">
              {/* <div className="manage_date">
                <ChevronLeftIcon className="manage_icon"/>
                  <div className="date_manage">{current_date}</div>
                <ChevronRightIcon className="manage_icon"/></div> */}

              <div className="manage_content_search">
                <Search
                  className="manage_search"
                  placeholder=" search "
                  onChange={(e) => this.searchChange(e)}
                  style={{ width: 150 }}
                />
              </div>

              <img
                className="manage_plus-icon"
                src={plus}
                alt={"hi"}
                onClick={this.handleClickopen}
              />
            </div>
          </div>

          {/* <ManageTable /> */}
          <div>
            <Tablecomponent
              heading={[
                { id: "sno", label: "S.no" },
                { id: "package", label: "Package" },
                { id: "duration", label: "Duration" },

                { id: "cost", label: "Cost (KWD)" },
                { id: "", label: "Action" },
              ]}
              // rowdata={
              //   this.state.tableData.length === 0 ? [] : this.state.tableData
              // }
              rowdata={searchData}
              tableicon_align={"cell_eye"}
              modelopen={(e, currentid) => this.modelopen(e, currentid)}
              Workflow="close"
              deleteopen={this.deleteopen}
              props_loading={this.state.props_loading}
            />

            <Modalcomp
              xswidth={"xs"}
              clrchange="textclr"
              title="Delete Package"
              visible={this.state.open}
              closemodal={this.handleClose}
            >
              <DeleteMedia
                deleteitem={this.deleteDealLIst}
                closeDeleteModel={this.handleClose}
              />
            </Modalcomp>

            <Modalcomp
              clrchange="text_color"
              custommodalsize="Hello"
              visible={this.state.openview}
              title={
                <div className="d-flex">
                  <div>Package details</div>
                  <div className="manage_view_label">Healthy Eats</div>
                </div>
              }
              closemodal={(e) => this.closemodal(e)}
              xswidth={"md"}
            >
              <ViewDetails
                clrchange="text_color"
                closemodal={(e) => this.closemodal(e)}
                view_data={this.state.viewdata}
              />
            </Modalcomp>

            <Modalcomp
              clrchange="text_color"
              custommodalsize="Hello"
              visible={this.state.editopen}
              title={"Edit Diet Plan"}
              closemodal={(e) => this.closemodal(e)}
            >
              <Add_Diet_Plan
                closemodal={(e) => this.closemodal(e)}
                editdata={this.state.editdata}
                getTableData={()=>this.getTableData()}
              />
            </Modalcomp>
          </div>
          <div className="Upload-modal-container">
            <Modalcomp
              custommodalsize="Hello"
              // clrchange="text_color"
              visible={this.state.open}
              closemodal={this.handleClickclose}
              title={"ADD PACKAGE"}
            >
              <ManageModal
                custommodalsize="Hello"
                clrchange="text_color"
                visible={this.state.open}
                closemodal={this.handleClickclose}
                getTableData={()=>this.getTableData()}
              />
            </Modalcomp>
          </div>
        </Paper>
      </div>
    );
  }
}
