import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import Button from "@material-ui/core/Button";
import "./ProfileView.css";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import dosa from "../../Images/dosa.png";
import meals from "../../Images/meals.png";
import chicken from "../../Images/chicken.png";
import { Paper, Card, Divider } from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import { Upload } from "antd";
import Dialog from "@material-ui/core/Dialog";
import { withStyles } from "@material-ui/core/styles";
import No_image_available from "../../Images/No_image_available.svg";
import { CardFooter } from "reactstrap";
import dateformat from "dateformat";
const styles = {};
export default class DeliveriesMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cancel: null,
      OpenViewData: [],
    };
  }
  handleClose = () => {
    this.props.closemodal(this.props.selectedValue);
  };
  UNSAFE_componentWillReceiveProps(newprops) {
    this.setState({
      viewdata: newprops.OpenViewData,
    });
  }
  formatTimeShow = (h_24) => {
    var h = Number(h_24.substring(0, 2)) % 12;
    if (h === 0) h = 12;
    return (
      (h < 10 ? "0" : "") +
      h +
      ":" +
      h_24.substring(3, 5) +
      (Number(h_24.substring(0, 2)) < 12 ? " AM" : " PM")
    );
  };

  render() {
    const { classes, onClose, cancel, selectedValue, ...other } = this.props;
    var val = this.props.OpenViewData;
    console.log(val, "val_chkingg_value");
    console.log(val.dietpackagedetails, "length");
    return (
      <Dialog
        onClose={this.handleClose}
        aria-labelledby="simple-dialog-title"
        {...other}
        maxWidth={
          this.props.xswidth === "xs"
            ? "xs"
            : this.props.xswidth === "lg"
            ? "lg"
            : "md"
        }
      >
        <div className="deliveries_layer_one">
          <div className="deliveries_card">
  {/* BREAKFAST EDIT */}
            <div className="flex-card card_main_one">
              <Card className="card_one">
                <CardHeader
                  title={
                    val.dietpackagedetails &&val.dietpackagedetails[0] &&val.dietpackagedetails[0].diet_sessions}
                  className="food_type"/>
                  {val.dietpackagedetails &&val.dietpackagedetails[0] &&val.dietpackagedetails.length > 0 ? (
                  <img src={val.dietpackagedetails &&val.dietpackagedetails[0].diet_filename}
                    className="food_image"/>
                ) : (
                  <img src={No_image_available} className="no_img_edit"></img>
                )}

                <Typography variant="body2" color="textSecondary" component="p">
                  {/* Dosa */}
                  {val.dietpackagedetails &&
                    val.dietpackagedetails[0] &&
                    val.dietpackagedetails[0].diet_itemname}
                </Typography>
              </Card>
            </div>

  {/*LUNCH EDIT */}

            <div className="flex-card card_main_two">
              <Card className="card_two">
                <CardHeader
                  title={val.dietpackagedetails &&val.dietpackagedetails[1] &&val.dietpackagedetails[1].diet_sessions}
                  className="food_type"/>

                {val.dietpackagedetails &&val.dietpackagedetails[1] &&val.dietpackagedetails.length > 0 ? (
                  <img src={val.dietpackagedetails && val.dietpackagedetails[1].diet_filename}
                    className="food_image" />
                ) : (
                  <img src={No_image_available} className="no_img_edit"></img>
                )}
                <Typography variant="body2" color="textSecondary" component="p">
                  {/* Meals */}
                  {val.dietpackagedetails &&
                    val.dietpackagedetails[1] &&
                    val.dietpackagedetails[1].diet_itemname}
                </Typography>
              </Card>
            </div>
  {/* DINNER EDIT */}

            <div className="flex-card card_main_three">
              <Card className="card_two">
                <CardHeader
                  title={
                    val.dietpackagedetails &&
                    val.dietpackagedetails[2] &&
                    val.dietpackagedetails[2].diet_sessions
                  }
                  className="food_type"
                />

                {val.dietpackagedetails &&
                val.dietpackagedetails[2] &&
                val.dietpackagedetails.length > 0 ? (
                  <img
                    src={
                      val.dietpackagedetails &&
                      val.dietpackagedetails[2].diet_filename
                    }
                    className="food_image"
                  />
                ) : (
                  <img src={No_image_available} className="no_img_edit"></img>
                )}

                <Typography variant="body2" color="textSecondary" component="p">
                  {/* Chicken */}
                  {val.dietpackagedetails &&
                    val.dietpackagedetails[2] &&
                    val.dietpackagedetails[2].diet_itemname}
                </Typography>
              </Card>
            </div>
          </div>
          <div className="line"></div>
          <div className="flex_card_content">
            <div className="fiber-food_type">
              {/* <div className="fiber_price_div">
                <Button className="fiber_price">1010 KWD</Button>
              </div> */}
              <h3 className="title_food_type">
                {/* Fiber Diet */}
                {val.diet_package_name && val.diet_package_name}
              </h3>
              <div className="calo_inst_food_edit">
              <p className="deliveries_head_content">
                Food Name :{" "}
                <span className="delivery_head_content">
                  {/* Dosa, Meals, Chicken */}
                  {val.dietpackagedetails &&
                  val.dietpackagedetails[0] &&
                  val.dietpackagedetails.length > 0
                    ? val.dietpackagedetails &&
                      val.dietpackagedetails[0] &&
                      val.dietpackagedetails[0].diet_itemname
                    : "-"}
                  ,
                  {val.dietpackagedetails &&
                  val.dietpackagedetails[1] &&
                  val.dietpackagedetails.length > 0
                    ? val.dietpackagedetails &&
                      val.dietpackagedetails[1] &&
                      val.dietpackagedetails[1].diet_itemname
                    : "-"}
                  ,
                  {val.dietpackagedetails &&
                  val.dietpackagedetails[2] &&
                  val.dietpackagedetails.length > 0
                    ? val.dietpackagedetails &&
                      val.dietpackagedetails[2] &&
                      val.dietpackagedetails[2].diet_itemname
                    : "-"}
                </span>
              </p>

              <p className="deliveries_head_content">
                Instruction :{" "}
                <span className="delivery_head_content">
                  {/* Low Salt, Low Spice */}
                  {val.instructions && val.instructions != "undefined"
                    ? val.instructions && val.instructions
                    : "_"}
                </span>
              </p>

              <p className="deliveries_head_content">
                Calories Per Day :{" "}
                <span className="delivery_head_content">
                  {/* 1046 */}
                  {val&&val.intake_cals_day ==null ? "--":
                  (val&&val.intake_cals_day)
                }
                </span>
              </p>
              </div>
            </div>
            <div className="flex_card_content_two">
              <div className="food_orderby">
                <p className="deliveries_head_content">
                  Date
                  <span className="delivery_head_content">
                    {/* 18 Dec 2019 */}
                    {/* {val.Date&&val.Date} */}
                    {dateformat(val.Date && val.Date, "dd mmm yyyy")}
                  </span>
                </p>
                <p className="deliveries_head_content">
                  Name
                  <span className="delivery_head_content">
                    {/* AAMINA */}
                    {val.CustomerName && val.CustomerName}
                  </span>
                </p>
                <p className="deliveries_head_content">
                  Gender
                  <span className="delivery_head_content">
                    {/* Female */}
                    {val.gender && val.gender}
                  </span>
                </p>
                <p className="deliveries_head_content">
                  Phone Number
                  <span className="delivery_head_content">
                    {/* +96522000001 */}
                    {val.phone_no && val.phone_no}
                  </span>
                </p>
              </div>
              <div className="line_two"></div>
              {/* <div className="food_orderby_details">
                <p className="deliveries_head_content">
                  Time : <span className="delivery_head_content">9.30AM</span>
                </p>
                <p className="deliveries_head_content">
                  From :{" "}
                  <span className="delivery_head_content">18 Sep 2019</span>
                </p>
                <p className="deliveries_head_content">
                  To :{" "}
                  <span className="delivery_head_content">19 Oct 2019</span>
                </p>
                <p className="deliveries_head_content">
                  Total Days : <span className="delivery_head_content">30</span>
                </p>
              </div> */}
              <div className="food_orderby">
                <p className="deliveries_head_content">
                  Time
                  <span className="delivery_head_content">
                    {/* 9.30AM */}
                    {val && val.Time ? this.formatTimeShow(val.Time) : "--"}
                  </span>
                </p>
                <p className="deliveries_head_content">
                  From
                  <span className="delivery_head_content">
                    {/* 18 Sep 2019 */}
                    {/* {val.fromDate && val.fromDate} */}
                    {dateformat(val.fromDate && val.fromDate, "dd mmm yyyy")}
                  </span>
                </p>
                <p className="deliveries_head_content">
                  To
                  <span className="delivery_head_content">
                    {/* 19 Oct 2019 */}
                    {/* {val.Todate && val.Todate} */}
                    {dateformat(val.Todate && val.Todate, "dd mmm yyyy")}
                  </span>
                </p>
                <p className="deliveries_head_content">
                  Total Days
                  <span className="delivery_head_content">
                    {/* +30 */}
                    {val.diet_duration && val.diet_duration}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="click_cancel">
            <Button
              className="orderSubmit"
              onClick={() => this.props.closemodal(false)}
              variant="contained"
            >
              Cancel
            </Button>
          </div>
        </div>
        {/* <div className="fiber_button">
        <Button className="orderSubmit" 
        onClick={()=>this.props.onClose(false)} 
        variant="contained">Cancel</Button>
        </div> */}
      </Dialog>
    );
  }
}
const Trainer_viewWrapped = withStyles(styles)(DeliveriesMaster);
