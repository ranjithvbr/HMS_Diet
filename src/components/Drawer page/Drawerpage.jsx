// import React from "react";
// import PropTypes from "prop-types";
// import classNames from "classnames";
// import { withStyles } from "@material-ui/core/styles";
// import Drawer from "@material-ui/core/Drawer";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import List from "@material-ui/core/List";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import Typography from "@material-ui/core/Typography";
// import Divider from "@material-ui/core/Divider";
// import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";
// import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
// import ChevronRightIcon from "@material-ui/icons/ChevronRight";
// import ListItem from "@material-ui/core/ListItem";
// import "./Drawerpage.css";
// import { Dropdown } from "react-bootstrap";
// import Avatar from "@material-ui/core/Avatar";
// import avatar from "../../Images/avatar.jpg";
// import Badge from "@material-ui/core/Badge";
// import bell from "../../Images/bell.png";
// import Logo from "../../Images/Logo.png";
// import dateFormat from "dateformat";
// import home_svg from "../../Images/home_svg.svg";
// import calendar_svg from "../../Images/calendar_svg.svg";
// import ad_svg from "../../Images/ad_svg.svg";
// import profile_svg from "../../Images/profile_svg.svg";
// import revenue_svg from "../../Images/revenue_svg.svg";
// import kwd_svg from "../../Images/kwd_svg.svg";
// import deals_svg from "../../Images/deals_svg.svg";
// import cancel_svg from "../../Images/cancel_svg.svg";
// import group_svg from "../../Images/group_svg.svg";
// import upload_svg from "../../Images/upload_svg.svg";
// import {
//   Menulist,
//   MenuItem,
//   ListItemText,
//   ListItemIcon,
//   MenuList,
// } from "@material-ui/core";
// import { Link } from "react-router-dom";
// import ReactSVG from "react-svg";
// // import Profilepage from "../LabProfile/Profilepage";
// import ProfileLogout from "./ProfileLogout/ProfileLogout";
// import { BrowserRouter, Switch, Route } from "react-router-dom";

// //  components master imports

// import DashboardMaster from "../DietDashboard/DashboardMaster";
// import TotalOrderMaster from "../TotalOrder/TotalOrderMaster";
// import CancelledOrdersMaster from "../CancelledOrder/CancelledOrdersMaster";
// import AdvertiseMaster from "../AdvertisementBooking/AdvertisementMaster";
// import DealsMaster from "../Deals/DealsMaster";
// import ManageMaster from "../Manage/ManageMaster";
// import RevenueMaster from "../Revenue/RevenueMaster";
// import MediaUploadsMaster from "../MediaUploads/MediaUploadsMaster";
// import TodaysPreparationMaster from "../TodaysPreparation/TodaysPreparationMaster";
// import DelieveriesMaster from "../TodaysDelivery/DelieveriesMaster";
// import PaymentReceived from "../PaymentReceived/PaymentReceived";
// import CancelPayment from "../CancelPayment/PaymentMethod";
// import ProfileComp from "../LabProfile/ProfileComp";
// import DeliveriesMaster from "../TodaysDelivery/DelieveriesMaster";

// const drawerWidth = 260;
// const styles = (theme) => ({
//   root: {
//     display: "flex",
//   },
//   appBar: {
//     zIndex: theme.zIndex.drawer + 1,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//   },
//   appBarShift: {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   },
//   menuButton: {
//     marginLeft: 12,
//     marginRight: 36,
//   },
//   hide: {
//     display: "none",
//   },
//   drawer: {
//     width: drawerWidth,
//     flexShrink: 0,
//     whiteSpace: "nowrap",
//   },
//   drawerOpen: {
//     width: drawerWidth,
//     transition: theme.transitions.create("width", {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   },
//   drawerClose: {
//     transition: theme.transitions.create("width", {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     overflowX: "hidden",
//     width: theme.spacing.unit * 7 + 1,
//     [theme.breakpoints.up("sm")]: {
//       width: theme.spacing.unit * 9 + 1,
//     },
//   },
//   toolbar: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "flex-end",
//     padding: "0 8px",
//     ...theme.mixins.toolbar,
//   },
//   content: {
//     flexGrow: 1,
//     padding: theme.spacing.unit * 3,
//   },
// });
// const current_date = dateFormat(new Date(), "DD-MM-YYYY h:mm:ss a");
// class MiniDrawer extends React.Component {
//   state = {
//     open: false,
//     logout: false,
//     time: current_date,
//   };

//   handleDrawerOpen = () => {
//     this.setState({ open: true });
//   };

//   handleDrawerClose = () => {
//     this.setState({ open: false });
//   };
//   viewmodalOpen = () => {
//     this.setState({ viewmodal: true });
//   };
//   viewmodalClose = () => {
//     this.setState({ viewmodal: false });
//   };
//   logoutOpen = () => {
//     this.setState({ logout: true });
//   };
//   logoutClose = () => {
//     this.setState({ logout: false });
//   };

//   componentDidMount = () => {
//     setInterval(() => {
//       this.setState({
//         time: dateFormat(new Date(), "DD-MM-YYYY h:mm:ss a"),
//       });
//     }, 1000);
//   };

//   render() {
//     const { classes, theme, children } = this.props;

//     return (
//       <div className="drawerpage_container">
//         <div className={classes.root}>
//           <CssBaseline />
//           <AppBar
//             position="fixed"
//             className={classNames(classes.appBar, {
//               [classes.appBarShift]: this.state.open,
//             })}
//           >
//             <Toolbar disableGutters={!this.state.open}>
//               <div className="drawer-logo-container">
//                 <img className="logo" src={Logo} alt="logo" />
//               </div>
//               <IconButton
//                 color="inherit"
//                 aria-label="Open drawer"
//                 onClick={this.handleDrawerOpen}
//                 className={classNames(classes.menuButton, {
//                   [classes.hide]: this.state.open,
//                 })}
//               >
//                 <MenuIcon />
//               </IconButton>
//               <div
//                 className={`${
//                   this.state.open
//                     ? "dropdown-container"
//                     : "dropdown-container_close"
//                 }`}
//               >
//                 <Dropdown>
//                   <Badge
//                     color="secondary"
//                     variant="dot"
//                     className={classes.margin}
//                   >
//                     <div className="notification-icon">
//                       {" "}
//                       <img className="notification" src={bell} />
//                     </div>
//                   </Badge>
//                   <Dropdown.Toggle
//                     variant="my_style"
//                     id="dropdown-basic"
//                     onClick={this.logoutOpen}
//                   >
//                     My Profile
//                   </Dropdown.Toggle>

//                   {/* <Dropdown.Menu className="dropdown-menu" >
//      <Dropdown.Item href="#/action-1">Action 1</Dropdown.Item>
//     <Dropdown.Item href="#/action-2">Action 2</Dropdown.Item>
//     <Dropdown.Item href="#/action-3">Log out</Dropdown.Item>
//   </Dropdown.Menu>  */}
//                 </Dropdown>
//                 {this.state.logout === true && (
//                   <div>
//                     <ProfileLogout
//                       open={this.state.logout}
//                       onClose={this.logoutClose}
//                       logout={() => this.props.history.push("/login")}
//                       goToProfile={() => {
//                         this.props.history.push("/Home/profile");
//                         this.logoutClose();
//                       }}
//                     />
//                   </div>
//                 )}
//                 <div className="date-wrapper1">
//                   <div className="date-wrapper2">
//                     <large className="date">{this.state.time}</large>
//                   </div>
//                 </div>
//               </div>

//               <Avatar
//                 className="Avatar-image"
//                 alt="avatar-missing"
//                 src={avatar}
//                 onClick={this.viewmodalOpen}
//                 className={classes.avatar}
//               />
//             </Toolbar>
//           </AppBar>
//           <Drawer
//             variant="permanent"
//             className={classNames(classes.drawer, {
//               [classes.drawerOpen]: this.state.open,
//               [classes.drawerClose]: !this.state.open,
//             })}
//             classes={{
//               paper: classNames({
//                 [classes.drawerOpen]: this.state.open,
//                 [classes.drawerClose]: !this.state.open,
//               }),
//             }}
//             open={this.state.open}
//           >
//             <div className={classes.toolbar}>
//               <IconButton onClick={this.handleDrawerClose}>
//                 {theme.direction === "rtl" ? (
//                   <ChevronRightIcon />
//                 ) : (
//                   <ChevronLeftIcon />
//                 )}
//               </IconButton>
//             </div>
//             <Divider />

// <MenuList className="appbar_sideicons">
//   <MenuItem component={Link} to="/Home/Dashboard">
//     <ListItemIcon>
//       <div className="icon-container">
//         <ReactSVG src={home_svg} />
//       </div>
//     </ListItemIcon>
//     <ListItemText primary="Home" />
//   </MenuItem>

//   <MenuItem component={Link} to="/Home/totalorder">
//     <ListItemIcon>
//       <div className="icon-container">
//         <ReactSVG src={calendar_svg} />
//       </div>
//     </ListItemIcon>
//     <ListItemText primary="Total Orders" />
//   </MenuItem>
//   {/* <MenuItem component={Link} to="/Home/todaysdeliveries">
//     <ListItemIcon>
//       <div className="icon-container">
//         <ReactSVG src={cancel_svg} />
//       </div>
//     </ListItemIcon>
//     <ListItemText primary="Todays Deliveries" />
//   </MenuItem> */}
//   {/* <MenuItem component={Link} to="/Home/todayspreparation">
//     <ListItemIcon>
//       <div className="icon-container">
//         <ReactSVG src={cancel_svg} />
//       </div>
//     </ListItemIcon>
//     <ListItemText primary="Todays Preparation" />
//   </MenuItem> */}

//   <MenuItem component={Link} to="/Home/cancelorders">
//     <ListItemIcon>
//       <div className="icon-container">
//         <ReactSVG src={cancel_svg} />
//       </div>
//     </ListItemIcon>
//     <ListItemText primary="Cancelled Orders" />
//   </MenuItem>

//   <MenuItem component={Link} to="/Home/advertisement">
//     <ListItemIcon>
//       <div className="icon-container">
//         <ReactSVG src={ad_svg} />
//       </div>
//     </ListItemIcon>
//     <ListItemText primary="Advertise Booking" />
//   </MenuItem>

//   <MenuItem component={Link} to="/Home/deals">
//     <ListItemIcon>
//       <div className="icon-container">
//         <div>
//           <ReactSVG src={deals_svg} />
//         </div>
//       </div>
//     </ListItemIcon>
//     <ListItemText primary="Deals" />
//   </MenuItem>

//   <MenuItem component={Link} to="/Home/revenue">
//     <ListItemIcon>
//       <div className="icon-container">
//         <ReactSVG src={revenue_svg} />
//       </div>
//     </ListItemIcon>
//     <ListItemText primary="Revenue" />
//   </MenuItem>

//   <MenuItem component={Link} to="/Home/manage">
//     <ListItemIcon>
//       <div className="icon-container">
//         <ReactSVG src={kwd_svg} />
//       </div>
//     </ListItemIcon>
//     <ListItemText primary="Manage Package" />
//   </MenuItem>

//   <MenuItem component={Link} to="/Home/mediaUploads">
//     <ListItemIcon>
//       <div className="icon-container">
//         <ReactSVG src={upload_svg} />
//       </div>
//     </ListItemIcon>
//     <ListItemText primary="Upload Images Videos" />
//   </MenuItem>

//   <MenuItem component={Link} to="/Home/profile">
//     <ListItemIcon>
//       <div className="icon-container">
//         <ReactSVG src={profile_svg} />
//       </div>
//     </ListItemIcon>
//     <ListItemText primary="Profile" />
//   </MenuItem>
// </MenuList>
//           </Drawer>
//           <main className={classes.content}>
//             <div className={classes.toolbar} />
//             <Route
//               path={`${this.props.match.path}/Dashboard`}
//               component={DashboardMaster}
//               exact
//             />
//             <Route
//               path={`${this.props.match.path}/totalorder`}
//               component={TotalOrderMaster}
//               exact
//             />
//             <Route
//               path={`${this.props.match.path}/cancelorders`}
//               component={CancelledOrdersMaster}
//               exact
//             />
//             <Route
//               path={`${this.props.match.path}/advertisement`}
//               component={AdvertiseMaster}
//               exact
//             />
//             <Route
//               path={`${this.props.match.path}/deals`}
//               component={DealsMaster}
//               exact
//             />
//             <Route
//               path={`${this.props.match.path}/revenue`}
//               component={RevenueMaster}
//               exact
//             />
//             <Route
//               path={`${this.props.match.path}/manage`}
//               component={ManageMaster}
//               exact
//             />
//             <Route
//               path={`${this.props.match.path}/mediauploads`}
//               component={MediaUploadsMaster}
//               exact
//             />
//             <Route
//               path={`${this.props.match.path}/profile`}
//               component={ProfileComp}
//               exact
//             />
//             <Route
//               path={`${this.props.match.path}/tomorrowspreparation`}
//               component={TodaysPreparationMaster}
//               exact
//             />
//             <Route
//               path={`${this.props.match.path}/todaysdelivery`}
//               component={DelieveriesMaster}
//               exact
//             />
//             <Route
//               path={`${this.props.match.path}/paymentreceived`}
//               component={PaymentReceived}
//               exact
//             />
//             <Route
//               path={`${this.props.match.path}/todaysdeliveries`}
//               component={DeliveriesMaster}
//               exact
//             />

//             <div>
//               {children}
//               {/* <Profilepage
//                 open={this.state.viewmodal}
//                 onClose={this.viewmodalClose}
//               /> */}
//             </div>
//           </main>
//         </div>
//       </div>
//     );
//   }
// }

// MiniDrawer.propTypes = {
//   classes: PropTypes.object.isRequired,
//   theme: PropTypes.object.isRequired,
// };

// export default withStyles(styles, { withTheme: true })(MiniDrawer);

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import "./Drawerpage.css";
import { Dropdown } from "react-bootstrap";
import Avatar from "@material-ui/core/Avatar";
import avatar from "../../Images/avatar.jpg";
import Badge from "@material-ui/core/Badge";
import bell from "../../Images/bell.png";
import Logo from "../../Images/Logo.png";
import dateFormat from "dateformat";
import home_svg from "../../Images/home_svg.svg";
import calendar_svg from "../../Images/calendar_svg.svg";
import ad_svg from "../../Images/ad_svg.svg";
import profile_svg from "../../Images/profile_svg.svg";
import revenue_svg from "../../Images/revenue_svg.svg";
import kwd_svg from "../../Images/kwd_svg.svg";
import deals_svg from "../../Images/deals_svg.svg";
import cancel_svg from "../../Images/cancel_svg.svg";
import group_svg from "../../Images/group_svg.svg";
import upload_svg from "../../Images/upload_svg.svg";
import moment from "moment";

import {
  Menulist,
  MenuItem,
  ListItemText,
  ListItemIcon,
  MenuList,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";
// import Profilepage from "../LabProfile/Profilepage";
import ProfileLogout from "./ProfileLogout/ProfileLogout";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";
import { notification } from "antd";
import Axios from "axios";
//  components master imports

import DashboardMaster from "../DietDashboard/DashboardMaster";
import TotalOrderMaster from "../TotalOrder/TotalOrderMaster";
import CancelledOrdersMaster from "../CancelledOrder/CancelledOrdersMaster";
import AdvertiseMaster from "../AdvertisementBooking/AdvertisementMaster";
import DealsMaster from "../Deals/DealsMaster";
import ManageMaster from "../Manage/ManageMaster";
import RevenueMaster from "../Revenue/RevenueMaster";
import MediaUploadsMaster from "../MediaUploads/MediaUploadsMaster";
import TodaysPreparationMaster from "../TodaysPreparation/TodaysPreparationMaster";
import DelieveriesMaster from "../TodaysDelivery/DelieveriesMaster";
import PaymentReceived from "../PaymentReceived/PaymentReceived";
import CancelPayment from "../CancelPayment/PaymentMethod";
import ProfileComp from "../LabProfile/ProfileComp";
import DeliveriesMaster from "../TodaysDelivery/DelieveriesMaster";
import { apiurl } from "../../App";
const drawerWidth = 260;

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 100,
    marginRight: 36,
    Fontsize: 10,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9 + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});
var today = new Date();

var date =
  today.getDate().toString().padStart(2, "0") +
  "-" +
  (today.getMonth() + 1).toString().padStart(2, "0") +
  "-" +
  today.getFullYear();
var time = today.toLocaleString("en-US", {
  hour: "numeric",
  minute: "numeric",
  hour12: true,
});

class MiniDrawer extends React.Component {
  state = {
    open: false,
    viewmodal: false,
    ProfileData: [],
    date: date,
    time: time,
    current_location: "",
  };
  active=()=>
  {
    this.setState({current_location:window.location.pathname})
  }
  
  componentDidMount() {
    this.ProfileGetApi();
  }

  generateAlert = (description) => {
    notification.success({
      // message: "Success",
      description,
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };

  report = () => {
    this.props.history.push("/");
  };

  ProfileGetApi = () => {
    var self = this;
    Axios({
      method: "POST",
      url: apiurl + "Diet/getdietvendorprofile",
      data: {
        dietvendorId: "12",
      },
    })
      .then((response) => {
        var ProfileData = [];
        console.log(response, "getdetails");
        ProfileData = response.data.data;
        this.setState({ ProfileData });
        this.props.ProfilegetApi();
      })
      .catch((error) => {});
  };

  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  viewmodalOpen = () => {
    this.setState({ viewmodal: true });
  };
  viewmodalClose = () => {
    this.setState({ viewmodal: false });
  };
  logoutClick = () => {
    window.localStorage.clear();
    window.location.assign("/?/nursemodule");
    this.props.onClose();
  };

  render() {
    const { classes, theme, children, onClose, selectedValue } = this.props;
    console.log(this.state.ProfileData, "dd");
    const { current_location } = this.state;
    const location = window.location.href;
    return (
      <div className="drawerpage_container">
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={classNames(classes.appBar, {
              [classes.appBarShift]: this.state.open,
            })}
          >
            <Toolbar disableGutters={!this.state.open}>
              <div className="drawer-logo-container">
                <img className="logo" src={Logo} alt="logo" />
              </div>
              {/* <div className="hamburger_icon"> */}
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, {
                  [classes.hide]: this.state.open,
                })}
              >
                <MenuIcon />
              </IconButton>
              {/* </div> */}
              <div
                className={`${
                  this.state.open
                    ? "dropdown-container"
                    : "dropdown-container_close"
                }`}
              >
                <Dropdown>
                  <Badge
                    color="secondary"
                    variant="dot"
                    className={classes.margin}
                  >
                    <div className="notification-icon">
                      {" "}
                      <img className="notification" src={bell} />
                    </div>
                  </Badge>
                  <Dropdown.Toggle variant="my_style" id="dropdown-basic">
                    {this.state.ProfileData &&
                      this.state.ProfileData[0] &&
                      this.state.ProfileData[0].vendor_name}
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="dropdown-menu">
                    {this.state.ProfileData.map((val) => {
                      return (
                        <div className="dropdown-img">
                          {/* <NavLink activeClassName="active" to="/Home/profilepage"> */}

                          <img
                            className="Avatar"
                            alt="avatar-missing"
                            src={val.vendor_filename}
                          />

                          {/* </NavLink> */}
                        </div>
                      );
                    })}
                    {this.state.ProfileData.map((val) => {
                      return (
                        <div className="name_email">
                          <NavLink
                            className={`${
                              location.endsWith("dashboard") && "activecolor"
                            }`}
                            to="/Home/profile"
                          >
                            <div
                              className="username"
                              style={{
                                color: "black",
                                textDecoration: "none",
                                fontSize: "15px",
                              }}
                            >
                              {val.vendor_name}
                            </div>
                          </NavLink>
                          <NavLink activeClassName="active" to="/Home/profile">
                            <div
                              style={{
                                color: "grey",
                                textDecoration: "none",
                                fontSize: "12px",
                              }}
                            >
                              {val.vendor_email}
                            </div>
                          </NavLink>
                        </div>
                      );
                    })}
                    <Divider />
                    <div className="profile_logout_butt">
                      <NavLink activeClassName="active" to="/Home/profile">
                        <p>Profile</p>
                      </NavLink>
                      {/* <Button
                        className="logout_butt"
                        // onClick={this.handleClose}
                        onClose={this.props.onClose}
                        onClick={this.logoutclick}
                      >
                        Logout
                      </Button> */}
                      <a
                        component={NavLink}
                        href="/dietmodule/?/"
                        className="logout_butt"
                        // onClick={this.handleClose}
                        onClose={this.props.onClose}
                      >
                        Logout
                      </a>
                    </div>
                    <Divider />
                    <div className="profile_logout_privacy ">
                      <p>Privacy Policy Terms of Service</p>
                    </div>
                  </Dropdown.Menu>
                </Dropdown>
                <div className="date-wrapper1">
                  <div className="date-wrapper2">
                    <large className="date">
                      {this.state.date}
                      {`   `}
                      {this.state.time}
                    </large>
                  </div>
                </div>
              </div>
              {this.state.ProfileData.map((val) => {
                return (
                  // <NavLink activeClassName="active" to="/Home/profilepage">
                  <Avatar
                    className="Avatar-image"
                    alt="avatar-missing"
                    src={val.vendor_filename}
                    // onClick={this.viewmodalOpen}
                    className={classes.avatar}
                  />
                  // </NavLink>
                );
              })}
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            className={classNames(classes.drawer, {
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open,
            })}
            classes={{
              paper: classNames({
                [classes.drawerOpen]: this.state.open,
                [classes.drawerClose]: !this.state.open,
              }),
            }}
            open={this.state.open}
          >
            <div className={classes.toolbar}>
              <IconButton onClick={this.handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </div>

            <MenuList className="appbar_sideicons">
              <MenuItem component={Link} to="/Home/Dashboard" className={`${location.endsWith("Dashboard") && "activecolor"}`}>
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={home_svg} />
                  </div>
                </ListItemIcon>
                <ListItemText primary="Home" />
              </MenuItem>

              <MenuItem component={Link} to="/Home/totalorder" className={`${location.endsWith("totalorder") && "activecolor"}`}>
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={calendar_svg} />
                  </div>
                </ListItemIcon>
                <ListItemText primary="Total Orders" />
              </MenuItem>
              <MenuItem component={Link} to="/Home/todaysdeliveries">
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={cancel_svg} />
                  </div>
                </ListItemIcon>
                <ListItemText primary="Todays Deliveries" />
              </MenuItem>
              {/* <MenuItem component={Link} to="/Home/todayspreparation">
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={cancel_svg} />
                  </div>
                </ListItemIcon>
                <ListItemText primary="Todays Preparation" />
              </MenuItem> */}

              <MenuItem component={Link} to="/Home/cancelorders">
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={cancel_svg} />
                  </div>
                </ListItemIcon>
                <ListItemText primary="Cancelled Orders" />
              </MenuItem>

              <MenuItem component={Link} to="/Home/advertisement">
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={ad_svg} />
                  </div>
                </ListItemIcon>
                <ListItemText primary="Advertisement Booking" />
              </MenuItem>

              <MenuItem component={Link} to="/Home/deals">
                <ListItemIcon>
                  <div className="icon-container">
                    <div>
                      <ReactSVG src={deals_svg} />
                    </div>
                  </div>
                </ListItemIcon>
                <ListItemText primary="Deals" />
              </MenuItem>

              <MenuItem component={Link} to="/Home/revenue">
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={revenue_svg} />
                  </div>
                </ListItemIcon>
                <ListItemText primary="Revenue" />
              </MenuItem>

              <MenuItem component={Link} to="/Home/manage">
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={kwd_svg} />
                  </div>
                </ListItemIcon>
                <ListItemText primary="Manage Package" />
              </MenuItem>

              <MenuItem component={Link} to="/Home/mediaUploads">
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={upload_svg} />
                  </div>
                </ListItemIcon>
                <ListItemText primary="Media Uploads" />
              </MenuItem>

              <MenuItem component={Link} to="/Home/profile">
                <ListItemIcon>
                  <div className="icon-container">
                    <ReactSVG src={profile_svg} />
                  </div>
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </MenuItem>
            </MenuList>
          </Drawer>

          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Route
              path={`${this.props.match.path}/Dashboard`}
              component={DashboardMaster}
              exact
            />
            <Route
              path={`${this.props.match.path}/totalorder`}
              component={TotalOrderMaster}
              exact
            />
            <Route
              path={`${this.props.match.path}/cancelorders`}
              component={CancelledOrdersMaster}
              exact
            />
            <Route
              path={`${this.props.match.path}/advertisement`}
              // component={AdvertiseMaster}
              render={(props) => <AdvertiseMaster {...this.props} generateAlert={this.generateAlert} />}
              exact
            />
            <Route
              path={`${this.props.match.path}/deals`}
              // component={DealsMaster}
              render={(props) => <DealsMaster {...this.props} generateAlert={this.generateAlert} />}
              exact
            />
            <Route
              path={`${this.props.match.path}/revenue`}
              // component={RevenueMaster}
              render={(props) => <RevenueMaster {...this.props} generateAlert={this.generateAlert} />}
              exact
            />
            <Route
              path={`${this.props.match.path}/manage`}
              component={ManageMaster}
              exact
            />
            <Route
              path={`${this.props.match.path}/mediauploads`}
              component={MediaUploadsMaster}
              exact
            />
            <Route
              path={`${this.props.match.path}/profile`}
              // component={ProfileComp}
              render={(props) => <ProfileComp {...this.props} generateAlert={this.generateAlert} />}
              
              exact
            />
            <Route
              path={`${this.props.match.path}/tomorrowspreparation`}
              component={TodaysPreparationMaster}
              exact
            />
            <Route
              path={`${this.props.match.path}/todaysdelivery`}
              component={DelieveriesMaster}
              exact
            />
            <Route
              path={`${this.props.match.path}/paymentreceived`}
              component={PaymentReceived}
              exact
            />
            <Route
              path={`${this.props.match.path}/todaysdeliveries`}
              component={DeliveriesMaster}
              exact
            />

            <div>
              {children}
              {/* <Profilepage
                open={this.state.viewmodal}
                onClose={this.viewmodalClose}
              /> */}
            </div>
          </main>
        </div>
      </div>
    );
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MiniDrawer);
