import React, { Component } from "react";
import "./DashboardTable.css";
import ProfileView from "../DietDashboard/ProfileView";
import Card from "@material-ui/core/Card";
import { NavLink, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Tablecomponent from "../../helpers/TableComponent/TableComp";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import dateFormat from "dateformat";
import DeliveriesModal from "../TodaysDelivery/DeliveriesModal";
import Pdf from "../../Images/pdf.svg";
import Excel from "../../Images/excel.svg";
import Print from "../../Images/print.svg";
import jsPDF from "jspdf";
import ReactSVG from "react-svg";
import "jspdf-autotable";
import axios from "axios";
import ReactExport from "react-data-export";
import { apiurl } from "../../App";
import ReactToPrint from "react-to-print";
import PrintData from "./printdata";
import { notification } from "antd";

const current_date = dateFormat(new Date(), "dd mmm yyyy");

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

export default class DashboardTable extends Component {
  state = {
    openview: false,
    DeliveryData: [],
    vendorId: 12,
    totalValue:"",
    totalorder:"",
    tomorrowspreparation:"",
    managepackage:"",
    cancellation:"",
    totalrevenue:"",
    OpenViewData:[],
    props_loading:true,
  };

  modelopen = (data, id) => {
    if (data === "view") {
      // alert(id);
      // var OpenViewData = this.state.totalValue.filter((OpenViewData)=>{
      //   console.log(OpenViewData,"store_data_check")
      //    return OpenViewData.CustomerId===id})
      this.setState({
        openview: true,
        OpenViewData: this.state.totalValue[id],
      });
      console.log(this.state.totalValue, "idchecking");
    } else if (data === "edit") {
      this.setState({ editopen: true });
    }
  };
  closemodal = () => {
    this.setState({ openview: false, editopen: false });
  };
  componentDidMount() {
    axios({
      method: "POST",
      url: apiurl + "Diet/Dietdashboard",
      data: {
        dietvendorId: this.state.vendorId,
        // limit: "1",
        // pageno: "1",
        today_date: dateFormat(new Date(), "yyyy-mm-dd"),
      },
    }).then((response) => {
      console.log("res_chkkk", response);
      var DeliveryData = [];
      var ViewDetails = [];
      const ApiData=response.data.data[0].dashboard
      console.log(ApiData,"api_datachk")

      response.data.data.length > 0 &&
        response.data.data[0].today_appointments.map((val, index) => {
          console.log("okkkk", val);
          DeliveryData.push({
            customer: val.CustomerName,
            package: val.diet_package_name,
            address: val.address,
            phone: val.phone_no,
            delivered: `${val.Noofdaystodeliverd} /  ${val.Totalnodaytodeliver}`,
            id: index,
          });
          ViewDetails.push(val);

          this.setState({
            DeliveryData: DeliveryData,
            totalValue:response.data.data[0].today_appointments,
            totalValue:ViewDetails,
            props_loading:false,

            totalorder:ApiData.total_appointments,
            tomorrowspreparation:ApiData.Todaysprepartion,
            managepackage:ApiData.manage_package,
            cancellation:ApiData.cancel_count,
            totalrevenue:ApiData.total_revenue,
           
          });
          console.log(this.state.totalValue, "chkkkkk");
        });
    });
  }

  Notification = () => {
    notification.info({
      description: "No Data Found",
      placement: "topRight",
    });
  };
  generatepdf = () => {
    if (this.state.DeliveryData.length === 0) {
      notification.info({
        description: "No Data Found",
        placement: "topRight",
        style: { marginBottom: "15px" },
      });
    } else {
      const doc = new jsPDF("a3");
      var bodydata = [];
      this.state.DeliveryData.map((data, index) => {
        console.log(data, "dataaa");
        bodydata.push([
          index + 1,
          data.customer,
          data.package,
          data.address,
          data.phone,
          data.delivered,
        ]);
      });
      doc.autoTable({
        beforePageContent: function (data) {
          doc.text("Dashboard Details", 15, 23); // 15,13 for css
        },
        margin: { top: 30 },
        showHead: "everyPage",
        theme: "grid",
        head: [
          [
            "S.No",
            "Customer",
            "Package",
            "Address",
            "Phone Number",
            "Delivered",
          ],
        ],
        body: bodydata,
      });
      doc.save("Dashboard Details.pdf");
    }
  };
  render() {
    var multiDataSetbody = [];
    this.state.DeliveryData.map((xldata, index) => {
      if (index % 2 !== 0) {
        multiDataSetbody.push([
          { value: index + 1, style: { alignment: { horizontal: "center" } } },
          { value: xldata.customer },
          { value: xldata.package },
          { value: xldata.address },
          { value: xldata.phone },
          { value: xldata.delivered },
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
            value: xldata.package,
            style: {
              fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } },
            },
          },
          {
            value: xldata.address,
            style: {
              fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } },
            },
          },
          {
            value: xldata.phone,
            style: {
              fill: { patternType: "solid", fgColor: { rgb: "e2e0e0" } },
            },
          },
          {
            value: xldata.delivered,
            style: {
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
            width: { wpx: 90 },
            style: {
              fill: { patternType: "solid", fgColor: { rgb: "86b149" } },
            },
          },
          {
            title: "Address",
            width: { wpx: 100 },
            style: {
              fill: { patternType: "solid", fgColor: { rgb: "86b149" } },
            },
          },
          {
            title: "Phone Number",
            width: { wpx: 90 },
            style: {
              fill: { patternType: "solid", fgColor: { rgb: "86b149" } },
            },
          },
          {
            title: "Delivered",
            width: { wpx: 90 },
            style: {
              fill: { patternType: "solid", fgColor: { rgb: "86b149" } },
            },
          },
        ],
        data: multiDataSetbody,
      },
    ];

    return (
      <>
        <div className="lab_dashboard_buttons_wrap">
          <Card
            component={NavLink}
            to="/Home/totalorder"
            className="lab_button5 lab_button_common_styles"
          >
            <p className="lab_button_text">Total Order</p>
            <div className="divider_container">
              <div className="divider_1px"></div>
            </div>
            <div className="lab_dash_numeric_wrap">
              <p className="lab_dash_numeric_value">{this.state.totalorder}</p>
            </div>
          </Card>

          <Card
            component={NavLink}
            to="/Home/tomorrowspreparation"
            className="lab_button3 lab_button_common_styles"
          >
            <p className="lab_button_text">Tomorrow's Preparation</p>
            <div className="divider_container">
              <div className="divider_1px"></div>
            </div>
            <div className="lab_dash_numeric_wrap">
              <p className="lab_dash_numeric_value">
                {this.state.tomorrowspreparation}
              </p>
            </div>
          </Card>

          <Card
            component={NavLink}
            to="/Home/manage"
            className="lab_button1 lab_button_common_styles"
          >
            <p className="lab_button_text">Manage Package</p>
            <div className="divider_container">
              <div className="divider_1px"></div>
            </div>
            <div className="lab_dash_numeric_wrap">
              <p className="lab_dash_numeric_value">
                {this.state.managepackage}
              </p>
            </div>
          </Card>

          <Card
            component={NavLink}
            to="/Home/cancelorders"
            className="lab_button2 lab_button_common_styles"
          >
            <p className="lab_button_text">Cancellation</p>
            <div className="divider_container">
              <div className="divider_1px"></div>
            </div>
            <div className="lab_dash_numeric_wrap">
              <p className="lab_dash_numeric_value">
                {this.state.cancellation}
              </p>
            </div>
          </Card>

          <Card
            component={NavLink}
            to="/Home/revenue"
            className="lab_button4 lab_button_common_styles"
          >
            <p className="lab_button_text">Total Revenue(KWD)</p>
            <div className="divider_container">
              <div className="divider_1px"></div>
            </div>
            <div className="lab_dash_numeric_wrap">
              <p className="lab_dash_numeric_value">
                {this.state.totalrevenue}
              </p>
            </div>
          </Card>
        </div>

        <div className="todaysdelivery_container">
          <div>
            <label className="todays_delivery_title">
              <text>Today's Deliveries</text>
            </label>
            {current_date}
          </div>
          {/* <div className="delivery_currentdate">{current_date}</div> */}
          {/* <div className="deliver_hardcopy">
            <div className="icon_head">
              <ReactSVG
                src={Pdf}
                style={{ marginRight: "15px", marginLeft: "15px" }}
                onClick={this.generatepdf}
              />

              {this.state.DeliveryData.length === 0 ? (
                <ReactSVG
                  onClick={this.Notification}
                  src={Excel}
                  style={{ marginRight: "15px", cursor: "pointer" }}
                />
              ) : (
                <ExcelFile
                  filename={"Dashboard Details"}
                  element={
                    <ReactSVG src={Excel} style={{ marginRight: "15px" }} />
                  }
                >
                  <ExcelSheet dataSet={multiDataSet} name="Dashboard Details" />
                </ExcelFile>
              )}

              {this.state.DeliveryData.length === 0 ? (
                <ReactSVG
                  onClick={this.Notification}
                  src={Print}
                  style={{ marginRight: "15px", cursor: "pointer" }}
                />
              ) : (
                <ReactToPrint
                  trigger={() => <ReactSVG src={Print} />}
                  content={() => this.componentRef}
                />
              )}
            </div>
          </div>
          <div style={{ display: "none" }}>
            <PrintData
              printtableData={this.state.DeliveryData}
              ref={(el) => (this.componentRef = el)}
            />
          </div> */}
        </div>
        {/* </div> */}

        <div>
          <Tablecomponent
            heading={[
              { id: "", label: "S.No" },
              { id: "customer", label: " Customer" },
              { id: "package", label: "Package" },
              { id: "address", label: "Address" },
              { id: "phone", label: "Phone Number" },
              { id: "delivered", label: "Delivered" },
              { id: "", label: "Action" },
            ]}
            rowdata={this.state.DeliveryData && this.state.DeliveryData}
            // tableicon_align={"cell_eye"}
            Workflow="close"
            EditIcon="close"
            DeleteIcon="close"
            UploadIcon="close"
            GrandTotal="close"
            props_loading={this.state.props_loading}
            modelopen={(e, id) => this.modelopen(e, id)}
          />
          <div className="diet_buttons_container">
            <div>
              <Button
                className="diet_dash_bottom_buttons diet_dash_bottom1"
                component={NavLink}
                to="/Home/mediauploads"
              >
                Media Upload
              </Button>
              <Button
                className="diet_dash_bottom_buttons diet_dash_bottom2"
                component={NavLink}
                to="/Home/advertisement"
              >
                Advertisement Booking
              </Button>
              <Button
                className="diet_dash_bottom_buttons diet_dash_bottom3"
                component={NavLink}
                to="/Home/todaysdeliveries"
              >
                Today's Deliveries
              </Button>
            </div>
          </div>
          <ProfileView
            clrchange
            open={this.state.openview}
            closemodal={(e) => this.closemodal(e)}
            OpenViewData={this.state.OpenViewData}
            xswidth={"md"}
          />

          <Modalcomp
            clrgreen
            visible={this.state.editopen}
            title={"Edit details"}
            closemodal={(e) => this.closemodal(e)}
            xswidth={"xs"}
          ></Modalcomp>
        </div>
      </>
    );
  }
}
