import React from "react";
import Avatar from "@material-ui/core/Avatar";
  // import avatar from "../../images/avatar.jpg";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import "./ProfileLogout.css";
import avatar from "../../../Images/avatar.jpg";
import ProfileComp from "../../LabProfile/ProfileComp"
export default class ProfileLogout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logout: false,
      vendorId: 12
    };


    // this.wrapperRef = React.createRef();

    // this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  // handleClickOutside(event) {
  //   if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
  //     this.props.onClose(false)
  //   }
  // }
  // componentDidMount() {
  //   document.addEventListener('mousedown', this.handleClickOutside);
  // }

  // componentWillUnmount() {
  //   document.removeEventListener('mousedown', this.handleClickOutside);
  // }

  // logoutOpen = () => {
  //   this.setState({ logout: true });
  // };
  // logoutClose = () => {
  //   this.props.onClose(false);
  //   localStorage.removeItem("vendorId");
  //   localStorage.removeItem("userId");
  //   localStorage.removeItem("vendor");
  //   this.props.logout(true);
  // };

  // goToProfile = () => {
  //   this.props.goToProfile()
  // }
  logoutOpen = () => {
    this.setState({ logout: true });
  };
  logoutClose = () => {
    this.props.onClose(false);
  };
  viewmodalOpen = () => {
        this.setState({ viewmodal: true });
      };

  render() {
    return (
      <div ref={this.wrapperRef}>
        <div className="avatar_div">
          <Paper className="avatar_container">
            {/* <div className="profile_logout_container">
              <img className="profile_logout_image" src={""} alt="sdfsd" />
            </div> */}
             <div className="profile_logout_container">
              <img className="profile_logout_image" src={avatar} />
            </div>
            {this.state.logout === true && (
                  <div>
                    <ProfileLogout
                      open={this.state.logout}
                      onClose={this.logoutClose}
                    />
                  </div>
                )}
            <div className="profile_logout_container">
              <div>
                <h6 className="name_head" onClick={this.viewmodalOpen}>Abdul Rahman</h6>
                <p>Abdul@gmail.com</p>
              </div>
            </div>
            <Divider />
            <div className="profile_logout_butt">
              <p>Profile</p>
              <Button className="logout_butt" onClick={() => this.logoutClose()}>
                Logout
              </Button>
            </div>
            <Divider />
            <div className="profile_logout_privacy ">
              <p>Privacy Policy Terms of Service</p>
            </div>
          </Paper>
          <div>
              {/* {children} */}
              <ProfileComp
                open={this.state.viewmodal}
                onClose={this.viewmodalClose}
              />
            </div>
        </div>
      </div>
    );
  }
}
