
import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import print from "../../Images/print.svg";
import pdf from "../../Images/pdf.svg";
import excel from "../../Images/excel.svg";
import ReactToPrint from "react-to-print";
import ReactExport from 'react-data-export';
import PrintData from "./printdata";
import ReactSVG from 'react-svg';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';
import { apiurl } from "../../App";
import dateFormat from 'dateformat';
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import DateRangeSelect from "../../helpers/DateRange/DateRange";
import "./CancelledOrdersMaster.css";
import { Input } from 'antd';
import {notification} from 'antd';
import {Spin} from 'antd';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

export default class CancelledOrdersMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      testDetails: [],
      openTestDetails: false,
      search: null,
      fromDate: dateFormat(new Date(), "yyyy-mm-dd"),
      toDate: dateFormat(new Date(), "yyyy-mm-dd"),
      props_loading:true,
      reload: false,
      vendorId: 12,
      tableData: [],
      responseAllData: [],
      view_data: [],
      openview: false,
      editopen: false,
      spinner: false,
    };
  }

  searchChange = (e) => {
    this.setState({
      search: e.target.value
    })
    this.setState({})
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
    const doc = new jsPDF("a3")
    var bodydata = []
    this.state.tableData.map((data, index) => {
      bodydata.push([index + 1, data.name, data.gender, data.age, data.package, data.from, data.to, data.cost])
    })
    doc.autoTable({
      beforePageContent: function (data) {
        doc.text("Cancelled Orders", 15, 23); // 15,13 for css
      },
      margin: { top: 30 },
      showHead: "everyPage",
      theme: "grid",
      head: [['S.No', 'Name', 'Gender', 'Age', 'Package', 'Ordered Date','Cancelled Date','Cost(KWD)']],
      body: bodydata,
    })

    doc.save("Cancelled Orders.pdf")

  }
}
  Notification=()=>{
    notification.info({
      description:
        'No Data Found',
        placement:"topRight",
    });
  }


  getRangeDate = (item) => {
    console.log(item, "checking Date")

    this.setState({
      fromDate: dateFormat(item[0].startDate, "yyyy-mm-dd"),
      toDate: dateFormat(item[0].endDate, "yyyy-mm-dd"),
      spinner: true

    }, () => {
      this.getTableData()
    })
  }
  componentDidMount() {
    this.getTableData();
  }

  getTableData = () => {
    this.setState({props_loading:true})
    var self = this;
    axios({
      method: "POST", //get method
      url: apiurl + "Diet/getdietcancelledorderlist",
      data: {
        "dietvendorId": this.state.vendorId,
        "fromDate": this.state.fromDate,
        "toDate": this.state.toDate,
        "period": "Day"

      },
    }).then((response) => {
      console.log("response_data", response);

      var tableData = [];
      var responseAllData = [];
      response.data.data.length > 0 &&
        response.data.data.map((val) => {
          tableData.push({
            name: val.CustomerName,
            gender: val.gender,
            age:val.age,
            package: val.diet_package_name,
          
            from: dateFormat(val.OrderedDate, "dd mmm yyyy"),
            to: dateFormat(val.CancelDate, "dd mmm yyyy"),
            cost: val.amount,
            id: val.CustomerId
          });
          responseAllData.push(val);
        });
      self.setState({
        tableData: tableData,
        responseAllData: responseAllData,
        props_loading:false,
        spinner:false,
      });
    });
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
    console.log(dateFormat(new Date(), "dd mmm yyyy"))
    const { Search } = Input;
    var tableData = this.state.tableData.filter((data) => {
      console.log(data, "Search_data")
      if (this.state.search === null)
        return data
      else if (data.name!== null && data.name.toLowerCase().includes(this.state.search.toLowerCase())
        || (data.gender!= null && data.gender.toLowerCase().includes(this.state.search.toLowerCase()))
        || (data.age != null && data.age.toString().includes(this.state.search.toString()))
        || (data.package != null && data.package.toString().includes(this.state.search.toString()))
        || (data.from != null && data.from.toString().includes(this.state.search.toString()))
        || (data.to != null && data.to.toString().includes(this.state.search.toString()))
        || (data.cost != null && data.cost.toString().includes(this.state.search.toString()))
      ) {
        return data
      }
    })
    // EXCEL FUNCTION
    var multiDataSetbody = []
    this.state.tableData.map((xldata, index) => {
      if (index % 2 !== 0) {
        multiDataSetbody.push([{ value: index + 1, style: { alignment: { horizontal: "center" } } },
        { value: xldata.name },
        { value: xldata.gender },
        { value: xldata.age },
        { value: xldata.package },
        { value: xldata.from },
        { value: xldata.to },
        { value: xldata.cost },])
      } else {
        multiDataSetbody.push([
          { value: index + 1, style: { alignment: { horizontal: "center" }, fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
          { value: xldata.name, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
          { value: xldata.gender, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
          { value: xldata.age, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
          { value: xldata.package, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
          { value: xldata.from, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
          { value: xldata.to, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
          { value: xldata.cost, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },])
      }
    })
    const multiDataSet = [
      {
        columns: [
          { title: "S.No", width: { wpx: 35 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
          { title: "Name", width: { wch: 20 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
          { title: "Gender", width: { wch: 20 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
          { title: "Age", width: { wpx: 90 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
          { title: "Package", width: { wpx: 100 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
          { title: "Ordered Date", width: { wpx: 100 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
          { title: "Cancelled Date", width: { wpx: 100 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
          { title: "Cost(KWD)", width: { wpx: 100 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
        ],
        data: multiDataSetbody
      }
    ];
    return (
      <Paper>
        <div className="dashboard_header">
          <div className="dashboard_title">CANCELLED ORDERS</div>
          <div style={{ fontSize: "14px", display: "flex", alignItems: "center", }} >
            <DateRangeSelect dynalign={"dynalign"} rangeDate={(item) => this.getRangeDate(item)} />
            <Search
              placeholder="Search"
              onChange={(e) => this.searchChange(e)}
              style={{ width: 150 }}
              className="mr-2 ml-2"
            />
            <div className="icon_head">
              <ReactSVG src={pdf} style={{ marginRight: "15px", marginLeft: "15px" }} onClick={this.generatepdf}
                style={{ marginRight: "15px", marginLeft: "15px" }} />

            {this.state.tableData.length === 0 ?
              <ReactSVG  onClick={this.Notification} src={excel} style={{ marginRight: "15px" ,cursor:"pointer"}} />:
              <ExcelFile filename={"Cancelled Orders"} element={<ReactSVG src={excel} style={{ marginRight: "15px" }} />}>
                <ExcelSheet dataSet={multiDataSet} name="Cancelled Orders" />
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
              <PrintData printtableData={this.state.tableData}
                ref={el => (this.componentRef = el)} />
            </div>
          </div>
        </div>



        <Tablecomponent
          heading={[
            { id: "sno", label: "S.No" },
            { id: "name", label: "Name" },
            { id: "gender", label: "Gender" },
            { id: "age", label: "Age" },
            { id: "package", label: "Package" },
            { id: "from", label: "Ordered Date" },
            { id: "to", label: "Cancelled Date" },
            { id: "cost", label: "Cost(KWD)" },
           
          ]}
          rowdata={tableData.length ===  0 ? []: tableData}
          tableicon_align={""}
          modelopen={(e) => this.modelopen(e)}
          EditIcon="close"
          DeleteIcon="close"
          Workflow="close"
          VisibilityIcon="close"
          props_loading={this.state.props_loading}
        />

        {/* </div> */}
      </Paper>
    );
  }
}






