import React, { Component } from "react";
import "./ViewTotalOrder.css";
import View from "../../Images/diet_profile.PNG";
import Dialog from "@material-ui/core/Dialog";
import { withStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import No_image_available from "../../Images/No_image_available.svg";
import dateformat from "dateformat";

const styles = {};

export default class ViewTotalOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cancel: null,
      OpenViewData: [],
    };
  }
  handleClose = () => {
    this.props.closemodal(true);
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
    const styles = "";
    const { classes, onClose, cancel, selectedValue, ...other } = this.props;
    var val = this.props.OpenViewData;
    console.log(val, "val_chking");
    // console.log(val.dietpackagedetails,"length")

    return (
      <div className="profile_view_diet_totalorder">
        <Dialog
          onClose={() => this.handleClose()}
          aria-labelledby="simple-dialog-title"
          {...other}
          minWidth="md"
          className="dietdashboard_profile_modal"
        >
          <div>
            <img
              src={
                val && val.profile_image
                  ? val.profile_image
                  : No_image_available
              }
              alt="This IMG format is not supporting"
              style={{ height: "100" }}
              className="diet_profileview_img"
            />
          </div>
          <CloseIcon
            onClick={() => this.props.closemodal(true)}
            className="close_diet"
          />

          <div className="profile_view_diet">
            <h3 className="diet_patient">
              {/* Aamina */}
              {val && val.CustomerName}
            </h3>
            <h4 className="diet_patient_age">
              {/* 26 Years */}
              {val && val.age} Years
            </h4>
            <h4 className="diet_patient_order">Ordered Details</h4>
          </div>
          <div className="profile_view_pad">
            <Grid container className="totalorder_view_one">
              <Grid item xs={6} md={6}>
                <div className="profile_view_details">
                  <div className="profile_view_content">
                    <div className="content_one">
                      <div>Date</div>
                    </div>
                    <div className="content_two_dec">
                      <div>
                        {/* 18 Dec 2019 */}
                        {/* {val&&val.OrderedDate} */}
                        {dateformat(val && val.OrderedDate, "dd mmm yyyy")}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="profile_view_details">
                  <div className="profile_view_content">
                    <div className="content_one">
                      <div>Time</div>
                    </div>
                    <div className="content_two">
                      <div>
                        {/* 9:30 AM */}
                        {/* {val&&val.OrderedTime} */}
                        {val && val.OrderedTime
                          ? this.formatTimeShow(val.OrderedTime)
                          : "--"}
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>

              <Grid item xs={6} md={6}>
                <div className="profile_view_details">
                  <div className="profile_view_content">
                    <div className="content_one">
                      <div>From Date</div>
                    </div>
                    <div className="content_two">
                      <div className="june">
                        {/* 7 Jun 2020 */}
                        {/* {val&&val.fromDate} */}
                        {dateformat(val && val.fromDate, "dd mmm yyyy")}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="profile_view_details">
                  <div className="profile_view_content">
                    <div className="content_one">
                      <div>To Date</div>
                    </div>
                    <div className="content_two">
                      <div>
                        {/* 14 Jul 2020 */}
                        {/* {val&&val.toDate} */}
                        {dateformat(val && val.toDate, "dd mmm yyyy")}
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>

            <div className="divider_blank"></div>

            <Grid container className="totalorder_view_one">
              <Grid item xs={6} md={6}>
                <div className="profile_view_details">
                  <div className="profile_view_content">
                    <div className="content_one">
                      <div>Package</div>  
                    </div>
                    <div className="content_two">
                      <div>
                        {/* Fiber Diet */}
                        {val && val.diet_package_name}
                      </div>
                    </div>
                  </div>
                </div>


                <div className="profile_view_details">
                  <div className="profile_view_content">
                    <div className="content_one">
                      <div>Total Days</div>
                    </div>
                    <div className="content_two">
                      <div>
                        {/* 30 */}
                        {val && val.Noofdays}
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>

              <Grid item xs={6} md={6}>
                <div className="profile_view_details">
                  <div className="profile_view_content">
                    <div className="content_one">
                      <div>Calories Per Day</div>
                    </div>
                    <div className="content_two">
                      <div>
                      {/* {1046} */}
                      {val&&val.intake_cals_day}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="profile_view_details">
                  <div className="profile_view_content">
                    <div className="content_one">
                      <div>Total Cost</div>
                    </div>
                    <div className="content_two">
                      <div>
                        {/* 110 KWD */}
                        {val && val.amount} KWD
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </Dialog>
      </div>
    );
  }
}
const Trainer_viewWrapped = withStyles(styles)(ViewTotalOrder);
