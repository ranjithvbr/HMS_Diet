import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import print from "../../Images/print.svg";
import pdf from "../../Images/pdf.svg";
import excel from "../../Images/excel.svg";
import ReactToPrint from "react-to-print";
import ReactExport from "react-data-export";
import PrintData from "./printdata";
import ReactSVG from "react-svg";
import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "axios";
import { apiurl } from "../../App";
import dateFormat from "dateformat";
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import DateRangeSelect from "../../helpers/DateRange/DateRange";
import "./DeliveriesMaster.css";
import { Input } from "antd";
import DeliveriesModal from "./DeliveriesModal";
import DeliveriesServiceTable from "./DeliveriesTable";
import {notification} from 'antd';
import {Spin} from 'antd';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

export default class DeliveriesMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      testDetails: [],
      openTestDetails: false,
      search: null,
      fromDate: dateFormat(new Date(), "yyyy-mm-dd"),
      toDate: dateFormat(new Date(), "yyyy-mm-dd"),
      props_loading: true,
      vendorId: 12,
      openview: "",
      totalValue:"",
      OpenViewData:[],
      spinner: false,
    };
  }

  searchChange = (e) => {
    this.setState({
      search: e.target.value,
    });
    this.setState({});
  };
  Notification=()=>{
    notification.info({
      description:
        'No Data Found',
        placement:"topRight",
    });
  }

  // PDF FUNCTION
  generatepdf = () => {
    if(this.state.tableData.length===0){
      notification.info({
        description:
          'No Data Found',
          placement:"topRight",
         style:{ marginBottom: "15px"}
         
      });
    }
    else{
    const doc = new jsPDF("a3");
    var bodydata = [];
    this.state.tableData.map((data, index) => {
      bodydata.push([
        index + 1,
        data.customer,
        data.pack,
        data.address,
        data.phone_number,
        data.total_days,
      ]);
    });
    doc.autoTable({
      beforePageContent: function (data) {
        doc.text("Today's Deliveries", 15, 23); // 15,13 for css
      },
      margin: { top: 30 },
      showHead: "everyPage",
      theme: "grid",
      head: [[ "S.No", "Customer","Package","Address","Phone Number","Total Days",],],
      body: bodydata,
    });

    doc.save("Today's Deliveries.pdf");
  };
}
modelopen = (data,id) => {
  if (data === "view") {
    // alert(id)
    this.setState({ 
      openview: true,
      OpenViewData: this.state.totalValue[id],
     });
  } 
  else if (data === "edit") {
    this.setState({ editopen: true });
  }
};

  componentDidMount() {
    this.getTableData();
  }

  getTableData = () => {
    this.setState({props_loading:true})
    var self = this;
    axios({
      method: "POST", //get method
      url: apiurl + "Diet/gettodaysdeliverylist",
      data: {
        dietvendorId: this.state.vendorId,
        fromDate: this.state.fromDate,
        toDate: this.state.toDate,
        period: "Day",
      },
    }).then((response) => {
      console.log("response_data_chk", response);

      var tableData = [];
      var responseAllData = [];
      response.data.data.length > 0 &&
        response.data.data.map((val,index) => {
          tableData.push({
            customer: val.CustomerName,
            pack: val.diet_package_name,
            address: val.address,
            phone_number: val.phone_no,
            total_days: val.Noofdays,
            id:index,
          });
          responseAllData.push(val);
        });
      self.setState({
        tableData: tableData,
        totalValue:response.data.data[0],
        totalValue:responseAllData,
        props_loading:false,
        spinner:false
      });
    });
  };

  getRangeDate = (item) => {
    console.log(item, "checking Date");

    this.setState(
      {
        fromDate: dateFormat(item[0].startDate, "yyyy-mm-dd"),
        toDate: dateFormat(item[0].endDate, "yyyy-mm-dd"),
        spinner: true
      },
      () => {
        this.getTableData();
      }
    );
  };
  

  closemodal = () => {
    this.setState({ openview: false, editopen: false });
  };

  render() {
    console.log(dateFormat(new Date(), "dd mmm yyyy"));
    const { Search } = Input;
    var tableData = this.state.tableData.filter((data) => {
      console.log(data, "Search_data");
      if (this.state.search === null) return data;
      else if (
        (data.customer !== null &&
          data.customer
            .toLowerCase()
            .includes(this.state.search.toLowerCase())) ||
        (data.pack != null &&
          data.pack.toLowerCase().includes(this.state.search.toLowerCase())) ||
        (data.address != null &&
          data.address
            .toLowerCase()
            .includes(this.state.search.toLowerCase())) ||
        (data.phone_number != null &&
          data.phone_number
            .toString()
            .includes(this.state.search.toString())) ||
        (data.total_days != null &&
          data.total_days.toString().includes(this.state.search.toString()))
      ) {
        return data;
      }
    });
    // EXCEL FUNCTION
    var multiDataSetbody = [];
    this.state.tableData.map((xldata, index) => {
      if (index % 2 !== 0) {
        multiDataSetbody.push([
          { value: index + 1, style: { alignment: { horizontal: "center" } } },
          { value: xldata.customer },
          { value: xldata.pack },
          { value: xldata.address },
          { value: xldata.phone_number },
          { value: xldata.total_days },
        ]);
      } else {
        multiDataSetbody.push([
          { value: index + 1,style: {alignment: { horizontal: "center" },fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } },},},
          {value: xldata.customer,style: {fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } },},},
          {value: xldata.pack,style: {fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } },},},
          {value: xldata.address,style: {fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } },},},
          {value: xldata.phone_number,style: {fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } },},},
          {value: xldata.total_days,style: {fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } },},},]);}});
    const multiDataSet = [
      {columns: [
          {title: "S.No",width: { wpx: 35 },style: {fill: { patternType: "solid", fgColor: { rgb: "86b149" } },},},
          {title: "Customer",width: { wch: 20 },style: {fill: { patternType: "solid", fgColor: { rgb: "86b149" } },},},
          {title: "Package",width: { wch: 20 },style: {fill: { patternType: "solid", fgColor: { rgb: "86b149" } },},},
          {title: "Address",width: { wpx: 90 },style: {fill: { patternType: "solid", fgColor: { rgb: "86b149" } },},},
          {title: "Phone Number",width: { wpx: 100 },style: {fill: { patternType: "solid", fgColor: { rgb: "86b149" } },},},
          {title: "Total Days",width: { wpx: 100 },style: {fill: { patternType: "solid", fgColor: { rgb: "86b149" } },},},],
        data: multiDataSetbody,
      },
    ];
    return (
      <Paper>
        <div className="dashboard_header">
          <div className="dashboard_title">TODAY'S DELIVERIES</div>
          <div
            style={{ fontSize: "14px", display: "flex", alignItems: "center" }}
          >
            <DateRangeSelect dynalign={"dynalign"} rangeDate={(item) => this.getRangeDate(item)}/>
            <Search
              placeholder="Search"
              onChange={(e) => this.searchChange(e)}
              style={{ width: 150 }}
              className="mr-2 ml-2"
            />
            <div className="icon_head">
              <ReactSVG
                src={pdf}
                style={{ marginRight: "15px", marginLeft: "15px" }}
                onClick={this.generatepdf}
                style={{ marginRight: "15px", marginLeft: "15px" }}
              />

            {this.state.tableData.length === 0 ?
              <ReactSVG  onClick={this.Notification} src={excel} style={{ marginRight: "15px" ,cursor:"pointer"}} />:
              <ExcelFile
                filename={"Today's Deliveries"}
                element={
                  <ReactSVG src={excel} style={{ marginRight: "15px" }} />
                }
              >
                <ExcelSheet dataSet={multiDataSet} name="Today's Deliveries" />
              </ExcelFile>
            }

            {this.state.tableData.length === 0 ?
                   <ReactSVG  onClick={this.Notification} src={print} style={{ marginRight: "15px",cursor:"pointer" }} />:
              <ReactToPrint
                trigger={() => <ReactSVG src={print} />}
                content={() => this.componentRef}
              />
            }
            </div>
            <div style={{ display: "none" }}>
              <PrintData
                printtableData={this.state.tableData}
                ref={(el) => (this.componentRef = el)}
              />
            </div>
          </div>
        </div>
        <div>
          <Tablecomponent
            heading={[
              { id: "sno", label: "S.No" },
              { id: "customer", label: "Customer" },
              { id: "pack", label: "Package" },
              { id: "address", label: "Address" },
              { id: "phone_number", label: "Phone Number " },
              { id: "total_days", label: "Total Days" },
              { id: "action", label: "Action" },
            ]}
            // rowdata={tableData}
            rowdata={tableData.length === 0 ? [] : tableData}
            tableicon_align={""}
            modelopen={(e,id) => this.modelopen(e,id)}
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
            OpenViewData={this.state.OpenViewData}
          />

          <Modalcomp
            visible={this.state.editopen}
            title={"Edit details"}
            closemodal={(e) => this.closemodal(e)}
            xswidth={"xs"}
          ></Modalcomp>

          <DeliveriesServiceTable tableData={this.state.tableData} />
        </div>
      </Paper>
    );
  }
}
