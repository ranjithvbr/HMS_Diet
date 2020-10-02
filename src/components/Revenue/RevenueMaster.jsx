import React, { Component } from "react";
import "./RevenueTable.css";
import "./RevenueMaster.css";
import Paper from "@material-ui/core/Paper";
import { Input, notification } from "antd";
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
import DateRangeSelect from "../../helpers/DateRange/DateRange";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

class RevenueMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      testDetails: [],
      revenueTotal: 0,
      openTestDetails: false,
      search: null,
      fromDate: dateFormat(new Date(), "yyyy-mm-dd"),
      toDate: dateFormat(new Date(), "yyyy-mm-dd"),
    };
  }

  componentDidMount() {
    this.getRevenueData();
  }

  Notification = () => {
    notification.info({
      description: "No Data Found",
      placement: "topRight",
    });
  };
  searchChange = (e) => {
    this.setState({
      search: e.target.value,
    });
    this.setState({});
  };

  getRangeDate = (item) => {
    console.log(item, "checking Date");
    this.setState(
      {
        fromDate: dateFormat(item[0].startDate, "yyyy-mm-dd"),
        toDate: dateFormat(item[0].endDate, "yyyy-mm-dd"),
      },
      () => this.getRevenueData()
    );
  };

  getRevenueData = () => {
    this.setState({
      props_loading: true,
    });
    axios({
      method: "POST",
      url: apiurl + "/getDietRevenue",
      data: {
        diet_vendor_id: "12",
        revenue_from: this.state.fromDate,
        revenue_to: this.state.toDate,
      },
    })
      .then((response) => {
        console.log(response.data.data.result, "res");
        var tableData = [];
        response.data.data.result.map((val) => {
          console.log("sdfkshdfgsdhs", val);
          tableData.push({
            customer: val.patient_name,
            package: val.diet_package_name,
            date: dateFormat(val.book_date, "dd mmm yyyy"),
            cost: val.cost,
            cash: val.cash,
            card: val.card,
            wallet: val.wallet,
            totalCharge: val.total_charge,
            id: val.booking_id,
          });
        });

        var totalAmount = 0;
        for (var i in response.data.data.result) {
          totalAmount = response.data.data.result[i].total_charge + totalAmount;
        }

        this.setState({
          props_loading: false,
          tableData: tableData,
          enableSearch: false,
          revenueTotal: totalAmount,
        });
        this.setState({});
      })
      .catch((error) => {});
  };

  // PDF FUNCTION
  generatepdf = () => {
    if (this.state.tableData.length === 0) {
      notification.info({
        description: "No Data Found",
        placement: "topRight",
      });
    } else {
      const doc = new jsPDF("a3");
      var bodydata = [];
      this.state.tableData.map((data, index) => {
        bodydata.push([
          index + 1,
          data.customer,
          data.package,
          data.date,
          data.cost,
          data.cash,
          data.card,
          data.wallet,
          data.totalCharge,
        ]);
      });
      doc.autoTable({
        beforePageContent: function (data) {
          doc.text("Revenue Details", 15, 23); // 15,13 for css
        },
        margin: { top: 30 },
        showHead: "everyPage",
        theme: "grid",
        head: [
          [
            "S.No",
            "Customer",
            "Package",
            "Date",
            "Cost",
            "Cash",
            "Card",
            "Wallet",
            "Total Charge(KWD)",
          ],
        ],
        body: bodydata,
      })
      doc.save('Revenue Details.pdf')
    }
  };

  render() {
    const { Search } = Input;
    var searchData = [];
    searchData = this.state.tableData.filter((data) => {
      console.log(data, "Search_data");
      if (this.state.search === null) return data;
      else if (
        (data.customer !== null &&
          data.customer
            .toLowerCase()
            .includes(this.state.search.toLowerCase())) ||
        (data.package != null &&
          data.package
            .toLowerCase()
            .includes(this.state.search.toLowerCase())) ||
        (data.date != null &&
          data.date.toString().includes(this.state.search.toString())) ||
        (data.cost != null &&
          data.cost.toString().includes(this.state.search.toString())) ||
        (data.cash != null &&
          data.cash.toString().includes(this.state.search.toString())) ||
        (data.card != null &&
          data.card.toString().includes(this.state.search.toString())) ||
        (data.wallet != null &&
          data.wallet.toString().includes(this.state.search.toString())) ||
        (data.totalCharge != null &&
          data.totalCharge.toString().includes(this.state.search.toString()))
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
          { value: xldata.package },
          { value: xldata.date },
          { value: xldata.cost },
          { value: xldata.cash },
          { value: xldata.card },
          { value: xldata.wallet },
          {
            value: xldata.totalCharge,
            style: { alignment: { horizontal: "center" } },
          },
        ]);
      } else {
        multiDataSetbody.push([
          {
            value: index + 1,
            style: {
              alignment: { horizontal: "center" },
              fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } },
            },
          },
          {
            value: xldata.customer,
            style: {
              fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } },
            },
          },
          {
            value: xldata.packge,
            style: {
              fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } },
            },
          },
          {
            value: xldata.date,
            style: {
              fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } },
            },
          },
          {
            value: xldata.cost,
            style: {
              fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } },
            },
          },
          {
            value: xldata.cash,
            style: {
              fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } },
            },
          },
          {
            value: xldata.card,
            style: {
              fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } },
            },
          },
          {
            value: xldata.wallet,
            style: {
              fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } },
            },
          },
          {
            value: xldata.totalCharge,
            style: {
              alignment: { horizontal: "center" },
              fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } },
            },
          },
        ]);
      }
    });
    const multiDataSet = [
      {
        columns: [
          {
            title: "S.No",
            width: { wpx: 35 },
            style: {
              fill: { patternType: "solid", fgColor: { rgb: "86b149" } },
            },
          },
          {
            title: "Customer",
            width: { wch: 20 },
            style: {
              fill: { patternType: "solid", fgColor: { rgb: "86b149" } },
            },
          },
          {
            title: "Package",
            width: { wch: 20 },
            style: {
              fill: { patternType: "solid", fgColor: { rgb: "86b149" } },
            },
          },
          {
            title: "Date",
            width: { wpx: 100 },
            style: {
              fill: { patternType: "solid", fgColor: { rgb: "86b149" } },
            },
          },
          {
            title: "Cost",
            width: { wpx: 100 },
            style: {
              fill: { patternType: "solid", fgColor: { rgb: "86b149" } },
            },
          },
          {
            title: "Cash",
            width: { wpx: 100 },
            style: {
              fill: { patternType: "solid", fgColor: { rgb: "86b149" } },
            },
          },
          {
            title: "Card",
            width: { wpx: 100 },
            style: {
              fill: { patternType: "solid", fgColor: { rgb: "86b149" } },
            },
          },
          {
            title: "Wallet",
            width: { wpx: 100 },
            style: {
              fill: { patternType: "solid", fgColor: { rgb: "86b149" } },
            },
          },
          {
            title: "Total Charge",
            width: { wpx: 100 },
            style: {
              fill: { patternType: "solid", fgColor: { rgb: "86b149" } },
            },
          },
        ],
        data: multiDataSetbody,
      },
    ];
    return (
      <Paper>
        <div className="dashboard_header">
          <div className="dashboard_title">REVENUE</div>
          <div
            style={{ fontSize: "14px", display: "flex", alignItems: "center" }}
          >
            <DateRangeSelect
              dynalign={"dynalign"}
              rangeDate={(item) => this.getRangeDate(item)}
            />
            <Search
              placeholder="Search"
              onChange={(e) => this.searchChange(e)}
              style={{ width: 150 }}
              className="mr-2 ml-2"
            />
            <ReactSVG
              src={pdf}
              style={{ marginRight: "15px", marginLeft: "15px" }}
              onClick={this.generatepdf}
            />

            {this.state.tableData.length === 0 ? (
              <ReactSVG
                onClick={this.Notification}
                src={excel}
                style={{ marginRight: "15px", cursor: "pointer" }}
              />
            ) : (
              <ExcelFile
                element={
                  <ReactSVG
                    src={excel}
                    onClick={() => alert(1)}
                    style={{ marginRight: "15px" }}
                  />
                }
              >
                <ExcelSheet dataSet={multiDataSet} name="Revenue Details" />
              </ExcelFile>
            )}

            {this.state.tableData.length === 0 ? (
              <ReactSVG
                onClick={this.Notification}
                src={print}
                style={{ marginRight: "15px", cursor: "pointer" }}
              />
            ) : (
              <ReactToPrint
                trigger={() => <ReactSVG src={print} />}
                content={() => this.componentRef}
              />
            )}
            <div style={{ display: "none" }}>
              <PrintData
                printtableData={this.state.tableData}
                ref={(el) => (this.componentRef = el)}
              />
            </div>
          </div>
        </div>
        <div className="revenue_details">
          <div>
            <div className="mode_of_pay">Mode of payment</div>
          </div>
          <div className="line_payment">
            <div className="inner_line"></div>
          </div>
          <Tablecomponent
            heading={[
              { id: "sno", label: "S.No" },
              { id: "customer", label: "Customer" },
              { id: "package", label: "Package" },
              { id: "date", label: "Date" },
              { id: "cost", label: "Cost" },
              { id: "cash", label: "Cash" },
              { id: "card", label: "Card" },
              { id: "wallet", label: "Wallet" },
              { id: "totalCharge", label: "Total Charge (KWD)" },
            ]}
            props_loading={this.state.props_loading}
            rowdata={searchData}
            tableicon_align={""}
            modelopen={(e) => this.modelopen(e)}
            EditIcon="close"
            DeleteIcon="close"
            VisibilityIcon="close"
          />
          <div className="revenueTotal">
            <span>Grand Total : {`${this.state.revenueTotal}`} KWD</span>
          </div>
        </div>
      </Paper>
    );
  }
}
export default RevenueMaster;
