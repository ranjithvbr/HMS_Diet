import React from "react";
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import ViewDetails from "../../components/Manage/ViewDetails";
import Add_Diet_Plan from "../../components/Manage/Add_Diet_Plan";
import axios from "axios";
import { apiurl } from "../../App"; import DeleteMedia from "./DeleteMedia";
import dateFormat from 'dateformat';
import "./ManageTable.css";

export default class ManageTable extends React.Component {
  state = {
    openview: false,
    date: "rrr",
    refresh: false,
    open: false,
    currentDeleteId: null,
    openview: false,
    tableData: [],
    responseAllData: [],
    viewdata: [],
    editdata: [],
    packageDetail: [],
    search: null,
    vendorId: 12
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
            duration:val.diet_duration,
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
      if(response.data.status==0){
        alert('Something went wrong!!')
      }else
      {
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

      console.log('fsdgsd', viewdata)
      // this.getPackageDetail(viewdata[0]);
      this.setState({ openview: true, viewdata: viewdata[0] });
    } else if (data === "edit") {
      var editdata = this.state.responseAllData.filter((editdata) => {
        return editdata.dietpackageId === id;
      });
      // this.getPackageDetail(editdata[0]);
      console.log(editdata, "editdata");
      this.setState({ editopen: true, editdata: editdata[0] });
    } else if (data == "delete") {
    }
  };



  closemodal = () => {
    // alert("gyhjm")
    this.setState({ openview: false, editopen: false });
  };

  deleteopen = (data,id) => {
    console.log("id1", id);
    this.setState({ openview: false, open: true, currentDeleteId: id });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const styles = "";
    const { classes, onClose, cancel, selectedValue, ...other } = this.props;
    return (
      <div>
        <Tablecomponent
          heading={[
            { id: "sno", label: "S.no" },
            { id: "package", label: "Package" },
            { id: "duration", label: "Duration" },
           
            { id: "cost", label: "Cost (KWD)" },
            { id: "", label: "Action" },
          ]}
          rowdata={this.state.tableData.length === 0 ? [] : this.state.tableData}
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
            view_data ={this.state.viewdata}
          />
        </Modalcomp>

        <Modalcomp
          clrchange="text_color"
          custommodalsize="Hello"
          visible={this.state.editopen}
          title={"Edit Diet Plan"}
          xswidth={"md"}
          closemodal={(e) => this.closemodal(e)}
        >
          <Add_Diet_Plan closemodal={(e) => this.closemodal(e)} 
          editdata={this.state.editdata} />
        </Modalcomp>
      </div>
    );
  }
}
