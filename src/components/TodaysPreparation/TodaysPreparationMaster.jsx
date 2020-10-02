
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
 import "./TodaysPreparationMaster.css";
 import Modalcomp from "../../helpers/ModalComp/Modalcomp";
 import TodaysPreparationModal from "./TodaysPreparationModal";
import TodaysPreparationTable from "./TodaysPreparationTable";
import DateRangeSelect from "../../helpers/DateRange/DateRange";
import {Input} from 'antd';
import {notification} from 'antd';
import Tablecomponent from "../../helpers/TableComponent/TableComp";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

export default class TodaysPreparationMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData:[],
      testDetails:[],
      openTestDetails:false,
      search:null,
      fromDate: dateFormat(new Date(),"yyyy-mm-dd"),
      toDate: dateFormat(new Date(),"yyyy-mm-dd"),
      props_loading:true
    };
  }

  Notification=()=>{
    notification.info({
      description:
        'No Data Found',
        placement:"topRight",
    });
  }
 

  searchChange = (e) => {
    this.setState({
      search: e.target.value
    })
    this.setState({})
  }
  // GET METHOD 
  componentDidMount() {
    this.getTableData();
  }

  getTableData = () => {
    var self = this;
    axios({
      method: "POST", //get method
      url: apiurl + "Diet/gettodaysprepartionlist",
      data: {
        dietvendorId: "12",
        period: "Day",
      },
    }).then((response) => {
      // console.log("response_data_CHECKK", response.data.data[0].MenuDetails);
      console.log(response.data.data,"chkkkkk")

      var tableData = [];
      // var responseAllData = [];
        response.data.data.map((val) => {
          val.MenuDetails.map((item)=>{
           console.log(item ,"oiuu")
             
          tableData.push({
            order: item.diet_itemname,
            instruction: item.instructions,
            quantity: item.diet_measure,
            id: item.dietbookingId,
          });
          })
        });
      self.setState({
        tableData: tableData,
        props_loading:false
        // responseAllData: responseAllData,
      });
    });
  };


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
      bodydata.push([index + 1, data.order, data.instruction,data.quantity])
    })
    doc.autoTable({
      beforePageContent: function (data) {
        doc.text("Today's Preparation", 15, 23); // 15,13 for css
      },
      margin: { top: 30 },
      showHead: "everyPage",
      theme: "grid",
      head: [['S.No', 'Order', 'Instruction', 'Quantity']],
      body: bodydata,
    })

    doc.save("Tomorrow's Preparation.pdf")

  }
  }


 

  closemodal = () => {
    this.setState({
      openTestDetails:false
    })
  }

  render() {
    console.log(dateFormat(new Date(), "dd mmm yyyy"))
    const { Search } = Input;
    var tableData = this.state.tableData.filter((data) => {
      console.log(data, "Search_data")
      if (this.state.search === null)
        return data
      else if (data.order !== null && data.order.toLowerCase().includes(this.state.search.toLowerCase())
        || (data.instruction != null && data.instruction.toLowerCase().includes(this.state.search.toLowerCase()))
        || (data.quantity != null && data.quantity.toString().includes(this.state.search.toString()))
      ) {
        return data
      }
    })
    // EXCEL FUNCTION
    var multiDataSetbody = []
    this.state.tableData.map((xldata, index) => {
      if (index % 2 !== 0) {
        multiDataSetbody.push([{ value: index + 1, style: { alignment: { horizontal: "center" } } },
        { value: xldata.order },
        { value: xldata.instruction },
        { value: xldata.quantity }])
      } else {
        multiDataSetbody.push([
          { value: index + 1, style: { alignment: { horizontal: "center" }, fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
          { value: xldata.order, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
          { value: xldata.instruction, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },
          { value: xldata.quantity, style: { fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } } } },])
      }
    })
    const multiDataSet = [
      {
        columns: [
          { title: "S.No", width: { wpx: 35 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
          { title: "Order", width: { wch: 20 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
          { title: "Instruction", width: { wch: 20 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
          { title: "Quantity", width: { wpx: 90 }, style: { fill: { patternType: "solid", fgColor: { rgb: "86b149" } } } },
        ],
        data: multiDataSetbody
      }
    ];
    return (
      <Paper>
        <div className="dashboard_header">
          <div className="dashboard_title">TOMORROW'S PREPARATION</div>
          <div style={{ fontSize: "14px", display: "flex", alignItems: "center", }} >
            {/* <DateRangeSelect dynalign={"dynalign"} rangeDate={(item) => this.getRangeDate(item)} /> */}
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
              <ExcelFile element={<ReactSVG src={excel} style={{ marginRight: "15px" }} />}>
                <ExcelSheet dataSet={multiDataSet} name="Tomorrow's Preparation" />
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

        <div>
        <Tablecomponent
          heading={[
            { id: "", label: "S.No" },
            { id: "order", label: "Order" },
            { id: "instruction", label: "Instruction" },
            { id: "quantity", label: "Quantity" },
          ]}
          rowdata={tableData.length === 0 ? [] : tableData}
          tableicon_align={""}
          modelopen={(e) => this.modelopen(e)}
          actionclose="close"
          props_loading={this.state.props_loading}
        />
{/* 
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
      </Paper>
    );
  }
}






