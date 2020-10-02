import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import Button from "@material-ui/core/Button";
import { Paper } from "@material-ui/core";
import { Tabs } from "antd";
import TextField from "@material-ui/core/TextField";
import Plus from "../../Images/plus.png";
import Add_diet from "../../Images/add_diet.PNG";
import Report from "../../Images/plus.png";
import "./ViewDetails.css";
import Breakfast1 from "../../Images/dosa.png";
import Breakfast2 from "../../Images/meals.png";
import Breakfast3 from "../../Images/chicken.png";
import Breakfast4 from "../../Images/diet5.jpg";
import Diet1 from "../../Images/lunch5.png";
import Diet3 from "../../Images/breakfast5.png";
import Diet4 from "../../Images/lunch4.jpg";
import Diet5 from "../../Images/diet5.jpg";

import { Carousel } from "react-bootstrap";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

export default class ViewDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", cancel: null };
  }
  callback = (key) => {
    console.log(key);
  };
  handleClose = () => {
    this.props.closemodal(this.props.selectedValue);
  };
  render() {
    const { TabPane } = Tabs;
    const { classes, onClose, cancel, selectedValue, ...other } = this.props;
    console.log("returenf", this.props.view_data);

    return (
      <div className="carousel_div">
        {/* <div class="container"> */}
        {/* <div id="myCarousel" class="carousel slide" data-ride="carousel" data-interval="0"> */}

        {/* <!-- Wrapper for slides -->  */}

        <div
        // class="carousel-inner"
        >
          {/* slide one */}
          <div
          // class="item active"
          >
            <div className="header_view_main">
              <div className="header_view_div">
                {this.props.view_data.foodSession.length > 0 &&
                  this.props.view_data.foodSession.map((item, i) => {
                    return (
                      <div className="manage_view_main_div">
                        <div className="manage_view_content">
                          <div className="image_adj">
                            <img src={item.diet_filename} className="rounded" />
                          </div>
                          <div
                            className="breakfast_main_box"
                            style={{ display: "flex" }}
                          >
                            <div className="breakfast_main_div">
                              <h4 className="view_breakfast">
                                {item.diet_package_name}
                              </h4>
                              <h5 className="dosa_content">{item.Foodname}</h5>
                              <h5 className="non_veg">
                                {item.filter_category}
                              </h5>
                            </div>
                            <div className="cal">546 Cal</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* <ArrowForwardIosIcon className="arrow_view_right"/> */}
          </div>
          {/* slide two */}

          {/* <ArrowForwardIosIcon className="arrow_view_right"/> */}

          {/* </div> */}

          {/* <!-- Left and right controls --> */}
          {/* <a class="left carousel-control left_arrow_carousel" href="#myCarousel" data-slide="prev">
      <span class="glyphicon glyphicon-chevron-left"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="right carousel-control right_arrow_carousel" href="#myCarousel" data-slide="next">
      <span class="glyphicon glyphicon-chevron-right"></span>
      <span class="sr-only">Next</span>
    </a> */}
        </div>

        {/* </div> */}
      </div>
    );
  }
}
