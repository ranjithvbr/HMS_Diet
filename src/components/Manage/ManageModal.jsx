import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Labelbox from "../../helpers/labelbox/labelbox";
import { Tabs } from "antd";
import Plus from "../../Images/plus.png";
import { notification, Select, Dropdown, Tag, Input } from "antd";
import Add_diet from "../../Images/add_diet.PNG";
import "./ManageModal.css";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { FiInfo } from "react-icons/fi";
import load from "../../Images/load.png";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import Chicken from "../../Images/chicken.png";
import Dosa from "../../Images/dosa.png";
import Divider from "@material-ui/core/Divider";
import { Card } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import ValidationLibrary from "../../helpers/validationfunction";
import { apiurl } from "../../App";
import { Upload, message } from "antd";
import CloseIcon from "@material-ui/icons/Close";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}
const { Option } = Select;
const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}
function handleChange(value) {
  console.log(value);
}

export default class ManageModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      package: [],
      packageId: null,
      filterCategoryId:null,
      menuItems: [],
      session: [],
      sessionId: null,
      stored: [],
      diet: "",
      dietlist: [],
      fiber: "",
      fiber_diet: [],
      paleo: "",
      paleo_diet: [],
      pack: "",
      pack_list: [],
      duration: "",
      duration_list: [],
      price: "",
      price_list: [],
      dietplan: "",
      imageUrl:"",
      active:false,

      // state for add diet item
      name: "",
      cancel: null,
      isMenuItemLoading: false,
      item: "",
      item_list: [],
      calory: "",
      calories: [],
      catagory: "",
      catagory_list: [],
      vegon: "",
      vegon_list: [],
      vendorId: 12,
      dietitem: [],
      editId: null,
      filterCategory:[],

      labmanage_test: {
        package: {
          value: "",
          validation: [{ name: "required" }],
          error: null,
          errmsg: null,
        },
        duration: {
          value: "",
          validation: [{ name: "required" }, { name: "allowNumaricOnly" }],
          error: null,
          errmsg: null,
        },

        price: {
          value: "",
          validation: [{ name: "required" }, { name: "allowNumaricOnly1" }],
          error: null,
          errmsg: null,
        },
        description: {
          value: "",
          validation: [{ name: "required" }],
          error: null,
          errmsg: null,
        },
      },
    };
  }

  checkValidation = () => {
    var labmanage_test = this.state.labmanage_test;
    var labmanage_testKeys = Object.keys(labmanage_test);
    console.log(labmanage_testKeys);
    for (var i in labmanage_testKeys) {
      var errorcheck = ValidationLibrary.checkValidation(
        labmanage_test[labmanage_testKeys[i]].value,
        labmanage_test[labmanage_testKeys[i]].validation
      );
      console.log(errorcheck);
      labmanage_test[labmanage_testKeys[i]].error = !errorcheck.state;
      labmanage_test[labmanage_testKeys[i]].errmsg = errorcheck.msg;
    }
    var filtererr = labmanage_testKeys.filter(
      (obj) => labmanage_test[obj].error == true
    );
    console.log(filtererr.length);
    if (filtererr.length > 0) {
      this.setState({ error: true });
    } else {
      this.setState({ error: false });
      this.submit();
    }
    this.setState({ labmanage_test });
  };

  changeDynamic = (data, key) => {
    console.log("key", key);
    console.log("data", data);

    var labmanage_test = this.state.labmanage_test;
    var targetkeys = Object.keys(labmanage_test);
    var errorcheck = ValidationLibrary.checkValidation(
      data,
      labmanage_test[key].validation
    );

    labmanage_test[key].value = data;
    labmanage_test[key].error = !errorcheck.state;
    labmanage_test[key].errmsg = errorcheck.msg;
    console.log("labmanage_test", labmanage_test);

    this.setState({ labmanage_test });
    var filtererr = targetkeys.filter(
      (obj) =>
        labmanage_test[obj].error == true || labmanage_test[obj].error == null
    );
    if (filtererr.length > 0) {
      this.setState({
        error: true,
        errordummy: false,
      });
    } else {
      this.setState({ error: false });
    }
  };

  componentDidMount = () => {
    this.getPackageList();
    this.getFilterCategory()
  };

  getFilterCategory = () =>{
    axios({
      method: "GET", //get method
      url: apiurl + "Diet/getdietcategory",
    }).then((response) => {
      if (response.data.status) {
        this.setState({
          filterCategory: response.data.data,
        });
      }
    });
  }

  getPackageList = () => {
    var self = this;
    axios({
      method: "POST", //get method
      url: apiurl + "Diet/getdietpackagename",
      data: {
        dietvendorId: this.state.vendorId,
      },
    }).then((response) => {
      if (response.data.status) {
        this.setState({
          package: response.data.data,
        });
      }
    });
  };

  getSessionList = () => {
    var self = this;
    axios({
      method: "POST", //get method
      url: apiurl + "Diet/getdietsession",
      data: {
        dietvendorId: this.state.vendorId,
        dietpackageId: this.state.packageId,
      },
    }).then((response) => {
      if (response.data.status) {
        this.setState({
          session: response.data.data,
        });
      }
    });
  };

  submit = () => {
    const { duration, price, description } = this.state.labmanage_test;

    axios({
      method: "POST",
      url: apiurl + "Diet/adddietpackage",
      data: {
        dietpackagename: this.state.labmanage_test.package.value,
        dietduration: duration.value,
        dietprice: price.value,
        dietdescription: description.value,
        dietactiveflag: this.state.active?"1":"0",
        dietvendorId: this.state.vendorId,
        createdby: "1",
        dietsession: this.state.dietlist,
      },
    }).then((response) => {
      if (response.data.status == 1) {
        var obj = {
          dietpackagename: this.state.labmanage_test.package.value,
          dietduration: duration.value,
          dietprice: price.value,
          dietdescription: description.value,
          dietactiveflag: this.state.active?"1":"0",
          dietvendorId: this.state.vendorId,
          createdby: "1",
          dietsession: this.state.dietlist,
        };
        this.setState({
          stored: [...this.state.stored, obj],
        });

        this.reset();
        //   this.props.closemodal(false);
        notification.success({
          message: "Package Added",
          description: "",
        });

        this.getPackageList();

      } else {
        notification.error({
          message: response.data.msg,
          description: "Process failed",
        });
      }
    });
  };

  reset = () => {
    //reset selected value
    var labmanage_test = this.state.labmanage_test;
    labmanage_test["package"].value = "";
    labmanage_test["duration"].value = "";
    labmanage_test["price"].value = "";
    labmanage_test["description"].value = "";

    this.setState(
      {
        labmanage_test,
        dietlist: [],
        home: 0,
        loc: 0,
        lang: 0,
        active: 0,
        reschedule: 0,
      },
      () => console.log(this.state)
    );
  };

  handleChange1 = (data, key) => {
    if (key == 0) {
      this.setState(
        {
          packageId: data,
        },
        () => {
          this.getSessionList();
        }
      );
    } else if (key == 1) {
      this.setState(
        {
          sessionId: data,
        },
        () => {
          // this.getTrainingList()
        }
      );
    }
    else if(key == 2){
      this.setState(
        {
          filterCategoryId: data,
        },
      )
    }
  };

  handleChange = (event) => {
    alert("2");
    console.log("valu", event.target.value);
    this.setState({
      // handle change for add package

      dietlist: event.target.value,
      fiber_diet: event.target.value,
      paleo_diet: event.target.value,
      pack_list: event.target.value,
      duration_list: event.target.value,
      price_list: event.target.value,

      // handle change for add diet plan
      item_list: event.target.value,
      calories: event.target.value,
      catagory_list: event.target.value,
      vegon_list: event.target.value,
    });
  };
  submitText = () => {
    var obj = {};
    obj.session = this.state.diet;

    this.setState({
      // submitText for add package

      diet: "",
      dietlist: [...this.state.dietlist, obj],

      // submitText for add diet plan
      catagory_list: [...this.state.catagory_list, this.state.catagory],
      vegon_list: [...this.state.vegon_list, this.state.vegon],
    });
  };
  submittedText = () => {
    var dietplan = (
      <div className="headnbody">
        <div className="first_item">
          {" "}
          <p>{this.state.pack}</p>
          <p>{this.state.duration}</p>
          <p>{this.state.price}</p>
        </div>
        <div className="body_second">
          <p>{this.state.fiber}</p>
        </div>
      </div>
    );

    var arrval = [];

    arrval.push(...this.state.dietplan, dietplan);

    console.log(arrval, "arrval");
    this.setState({
      dietplan: arrval,
    });
  };

  // submit text content for add diet plan

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  log = (e, i) => {
    console.log("log", e);
    var menuItems = this.state.menuItems;
    menuItems[i].diet_filter_category_id = menuItems[
      i
    ].diet_filter_category_id.filter((item, i) => item != e);
    this.setState({ menuItems });
  };

  handleChange = (info) => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      this.setState(
        {
          imageData: info,
        },
        () => console.log("sdfdsfsdhfjhsdfhsdfd", this.state.imageData)
      );

      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) =>
        this.setState({
          imageUrl,
          loading: false,
        })
      );
    }
  };

  onUpload = () => {
    if (!this.state.packageId > 0) {
      alert("Select Package Name");
      return;
    } else if (!this.state.sessionId > 0) {
      alert("Select Meal Name");
      return;
    } else if (this.state.item == "") {
      alert("Enter Item");
      return;
    }
    else if(this.state.calory==""){
      alert("Enter Calories");
      return;
    } else if (this.state.filterCategoryId===null) {
      alert("Select Filter Category");
      return;
    }else if (this.state.imageUrl==="") {
      alert("Please choose Image");
      return;
    }

    if (this.state.isMenuItemLoading == true) return;

    if (this.state.imageData) {
      this.setState({
        isMenuItemLoading: true,
      });

      var formData = new FormData();

      for (let i in this.state.imageData) {
        formData.append("UploadFile", this.state.imageData[i].originFileObj);
      }

      axios({
        method: "POST",
        url: apiurl + "Diet/uploaddietmenuitemimage",
        data: formData,
      })
        .then((response) => {
          this.setState({
            isMenuItemLoading: false,
          });

          if (response.data.status == 1) {
            var obj = {};
            obj.diet_itemname = this.state.item;
            obj.diet_measure = this.state.calory;
            obj.diet_filename = response.data.imageName;
            obj.diet_item_description = "";
            obj.diet_filter_category_id = this.state.filterCategoryId;
            obj.diet_package_id = this.state.packageId;
            obj.diet_packoption_id = this.state.sessionId;
            obj.imageUrl = response.data.data + response.data.imageName;

            var menuItems = this.state.menuItems;
            this.setState(
              {
                menuItems: [...this.state.menuItems, obj],
              },
              () => this.resetMenuItems()
            );
          } else this.Notification("Failed to Upload");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      var obj = {};
      obj.diet_itemname = this.state.item;
      obj.diet_measure = this.state.calory;
      obj.diet_filename = "";
      obj.diet_item_description = "";
      obj.diet_filter_category_id = this.state.filterCategoryId;
      obj.diet_package_id = this.state.packageId;
      obj.diet_packoption_id = this.state.sessionId;
      obj.imageUrl = "";
      console.log("apicall", obj);

      var menuItems = this.state.menuItems;
      this.setState(
        {
          menuItems: [...this.state.menuItems, obj],
        },
        () => this.resetMenuItems()
      );
    }
  };

  closeMenuItem = (index) => {
    var menuItems = this.state.menuItems;

    menuItems.splice(index, 1);
    this.setState({ menuItems });
  };

  textSubmit = (data, i) => {
    return (
      <div className="img_card_view">
        <Card className="img_card_food">
          <div className="presc_images">
            <CloseIcon
              className="close_icon_addmodal_manage"
              onClick={() => this.closeMenuItem(i)}
            />
            <img
              src={
                // data.imageUrl == "" || data.imageUrl == null
                //   ? Dosa
                //   : 
                  data.imageUrl
              }
              className="manage-add-food_image"
            />
          </div>
          <Typography variant="body2" color="textSecondary" component="p">
            Breakfast
          </Typography>

          <div className="dietitem">
            <div className="dietname">{data.diet_itemname}</div>
            <div className="dietcalories">{data.diet_measure}</div>
          </div>
          {/* {data.diet_filter_category_id &&
            data.diet_filter_category_id.map((catagory) => (
              <Tag
                className="add-catagory-browser-li"
                closable
                onClose={() => this.log(catagory, i)}
              >
                {catagory}
              </Tag>
            ))} */}
          {this.state.vegon_list &&
            this.state.vegon_list.map((vegon) => (
              <Tag
                className="add-catagory-browser-li"
                closable
                onClose={() => this.log(vegon, i)}
              >
                {vegon}
              </Tag>
            ))}
        </Card>
      </div>
    );

    // var arrval = [];

    // arrval.push(...this.state.dietitem, dietitem);

    // console.log(arrval, "arrval");
    // this.setState({
    //   dietitem: arrval,
    // });
  };

  submitSubMenu = () => {
    console.log("this.state.menuItems", {
      dietmenuitem: this.state.menuItems,
    });
    if (!this.state.menuItems.length > 0) {
      alert("Add sub menu item");
      return;
    }

    axios({
      method: "POST",
      url: apiurl + "Diet/insertdietmenu",
      data: {
        dietmenuitem: this.state.menuItems,
      },
    }).then((response) => {
      if (response.data.status == 1) {
        this.resetMenuItems();
        this.props.getTableData()
        this.props.closemodal(false);
        notification.success({
          message: "Sub Menu Item  Added",
          description: "",
        });
      } else {
        notification.error({
          message: response.data.msg,
          description: "Process failed",
        });
      }
    });
  };

  resetMenuItems = () => {
    this.setState(
      {
        item: "",
        calory: "",
        catagory_list: [],
        packageId: 0,
        sessionId: 0,
        filterCategoryId: null,
        imageUrl: "",
        imageData: "",
      },
      () => console.log(this.state)
    );
  };

  setFilterCategory = (value) => {
    console.log("sert", value);
    this.setState({
      catagory_list: value,
    });
  };

  deletetag=(uploadindex)=>{
    var sessiontag = this.state.dietlist.filter((data, index) => {
      return index !== uploadindex
    })
    this.setState({dietlist:sessiontag})
  }

  render() {
    const { TabPane } = Tabs;
    console.log(this.state.dietplan, "dietplan");
    const { loading, imageUrl } = this.state;
    const uploadButton = (
      <div>
        {/* {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div> */}
        <div className="upload-icon">
          <i class="fa fa-user-plus" aria-hidden="true"></i>
        </div>
      </div>
    );

    return (
      <>
        <div className="main_div">
          {/* <Paper> */}
          <Tabs defaultActiveKey="1" onChange={this.callback}>
            {/* add package contents */}

            <TabPane
              tab={this.state.editId != null ? "Edit Package" : "Add Package"}
              key="1"
              className="package_tab"
            >
              <Grid container>
                <Grid item xs={12} md={7}>
                  <div className="sub_grid_1">
                    <div className="add-package-label">
                      <Labelbox
                        type="text"
                        labelname="Package Name"
                        className="name"
                        changeData={(data) =>
                          this.changeDynamic(data, "package")
                        }
                        value={this.state.labmanage_test.package.value}
                        error={this.state.labmanage_test.package.error}
                        errmsg={this.state.labmanage_test.package.errmsg}
                      />
                    </div>

                    <div className="add_package_duration">
                      <div className="div_duration add-package-label">
                        <Labelbox
                          type="text"
                          labelname="Duration in Week"
                          className="name"
                          changeData={(data) =>
                            this.changeDynamic(data, "duration")
                          }
                          value={this.state.labmanage_test.duration.value}
                          error={this.state.labmanage_test.duration.error}
                          errmsg={this.state.labmanage_test.duration.errmsg}
                        />
                      </div>

                      <div className="add-package-label">
                        <Labelbox
                          type="text"
                          labelname="Price(KWD)"
                          className="name"
                          changeData={(data) =>
                            this.changeDynamic(data, "price")
                          }
                          value={this.state.labmanage_test.price.value}
                          error={this.state.labmanage_test.price.error}
                          errmsg={this.state.labmanage_test.price.errmsg}
                        />
                      </div>
                      <div style={{ marginLeft: "5px" }}>
                        <div>Active</div>
                        <Checkbox
                        className="active_addpackagee"
                          checked={this.state.active}
                          value="secondary"
                          onChange={()=>this.setState({active:!this.state.active})}
                          color="primary"
                          inputProps={{ "aria-label": "secondary checkbox" }}
                        />
                      </div>
                    </div>

                    <div className="browse_package">
                      <Labelbox
                        labelname="Meal Name"
                        type="text"
                        value={this.state.diet}
                        changeData={(diet) => this.setState({ diet })}
                      />
                      <img
                        src={Plus}
                        className="add-browse_plus"
                        onClick={this.submitText}
                      />
                    </div>
                    <div className="add-browse-input">
                      {this.state.dietlist &&
                        this.state.dietlist.map((diet,index) => (
                          // <ul className="add-input-browser-ul">

                          <div className="add-input-browser-li">
                            <div>{diet.session}<CloseIcon className="" onClick={() => this.deletetag(index)} /></div>
                            
                          </div>

                          // </ul>
                        ))}
                    </div>
                    <div className="add-package-description">
                      <Labelbox
                        // type="textarea"
                        // labelname="Description"
                        // value={(this.state.fiber, this.state.paleo)}
                        // changeData={(fiber, paleo) =>
                        //   this.setState({ fiber, paleo })
                        // }

                        type="textarea"
                        labelname="Description"
                        className="name"
                        changeData={(data) =>
                          this.changeDynamic(data, "description")
                        }
                        value={this.state.labmanage_test.description.value}
                        error={this.state.labmanage_test.description.error}
                        errmsg={this.state.labmanage_test.description.errmsg}
                      />
                      <div className="add_pack_button">
                        <Button onClick={this.checkValidation}>Add</Button>
                      </div>
                    </div>
                    {/* <div className="add_pack_button">
                      <Button onClick={this.checkValidation}>Add</Button>
                    </div> */}
                  </div>
                </Grid>

                <Grid item xs={12} md={5}>
                  <div className="diet-scroll">
                    <div>
                      <h5>
                        <strong>Preview</strong>
                      </h5>
                    </div>

                    <Grid container>
                      {this.state.stored.length > 0 &&
                        this.state.stored.map((item, i) => {
                          var temp = [];
                          for (
                            let index = 0;
                            index < item.dietsession.length;
                            index++
                          ) {
                            temp.push(item.dietsession[index].session);
                          }

                          return (
                            <div className="headnbody">
                              <div className="first_item">
                                <p>{item.dietpackagename}</p>
                                <p>{item.dietduration}</p>
                                <p>{item.dietprice}</p>
                              </div>
                              <div className="body_second">
                                <p>{temp.join(",")}</p>
                              </div>
                            </div>
                          );
                        })}
                    </Grid>
                  </div>
                </Grid>
              </Grid>
            </TabPane>

            {/* add diet plan contents */}

            <TabPane tab="Add Menu Items" key="2">
              <Grid container spacing={2}>
                <Grid item xs={12} md={3} className="blank_div">
                  <div className="add_diet_plan_subdiv">
                    <div className="add_diet_dropdown">
                      <label>Package Name</label>
                      <Select
                        defaultValue={"Select"}
                        placeholder=""
                        className="width_training1"
                        style={{
                          width: 200,
                          zIndex: "9999999999 !important",
                          marginBottom: 20,
                        }}
                        onChange={(value) => this.handleChange1(value, 0)}
                      >
                        {this.state.package.map((e, key) => {
                          return (
                            <Option key={key + 1} value={e.dietpackageId}>
                              {e.diet_package_name}
                            </Option>
                          );
                        })}
                      </Select>
                      <label>Meal Name</label>

                      <Select
                        className=" "
                        defaultValue={"Select"}
                        className="width_training1"
                        placeholder="Select"
                        style={{ width: 200, zIndex: "9999999999 !important" }}
                        onChange={(value) => this.handleChange1(value, 1)}
                      >
                        {this.state.session.map((e, key) => {
                          return (
                            <Option key={key + 1} value={e.dietsessionId}>
                              {e.diet_sessions}
                            </Option>
                          );
                        })}
                      </Select>

                      {/* <Labelbox
                        type="select"
                        value=""
                        labelname="Package Name"
                      />  

                      <Labelbox type="select" value="" /> */}
                    </div>
                  </div>
                  <div className="blank"></div>
                </Grid>

                <Grid item xs={9} md={9} className="second_grid_main">
                  <div className="add_diet_imgitem">
                    {/* <img src={Chicken} className="chick" /> */}
                    <Upload
                      name="avatar"
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      beforeUpload={beforeUpload}
                      onChange={this.handleChange}
                    >
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt="avatar"
                          style={{ width: "100%" }}
                        />
                      ) : (
                        uploadButton
                      )}
                    </Upload>
                  </div>
                  <div className="sub_main_catagory">
                    <div className="sub_sub_content">
                      <div className="diet_label_five">
                        <Labelbox
                          type="text"
                          labelname="Item Name"
                          value={this.state.item}
                          changeData={(item) => this.setState({ item })}
                        />
                      </div>

                      <div className="diet_label_six">
                        <Labelbox
                          type="text"
                          labelname="Calories"
                          value={this.state.calory}
                          changeData={(calory) => this.setState({ calory })}
                        />
                      </div>

                      <div className="add_diet_bg_icon">
                        <Button className="diet_btn" onClick={this.onUpload}>
                          Add
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label>Filter Catagory</label>
                      <div className="sub_sub_content">
                        {/* <Select
                          mode="multiple"
                          allowClear
                          style={{ width: "100%" }}
                          placeholder="Please select"
                          defaultValue={this.state.catagory_list}
                          onChange={this.setFilterCategory}
                        >
                          {children}
                        </Select> */}
                        <Select
                        className=" "
                        defaultValue={"Select"}
                        className="width_training1"
                        placeholder="Select"
                        style={{ width: 200, zIndex: "9999999999 !important" }}
                        onChange={(value) => this.handleChange1(value, 2)}
                      >
                        {this.state.filterCategory.map((e, key) => {
                          return (
                            <Option key={key + 1} value={e.dietfiltercategoryId}>
                              {e.filter_category}
                            </Option>
                          );
                        })}
                      </Select>
                      </div>
                      {/* <div>
                        <Labelbox type="select" value="" />
                      </div> */}
                      {/* <div className="sub_sub_content">
                        <Labelbox
                          type="text"
                          labelname="Filter Catagory"
                          value={this.state.catagory}
                          changeData={(catagory) => this.setState({ catagory })}
                        />
                      </div> */}

                      {/* <div className="diet_label_four">
                        <Labelbox
                          type="text"
                          value={this.state.vegon}
                          changeData={(vegon) => this.setState({ vegon })}
                        />
                      </div> */}

                      {/* <div>
                        <img
                          src={Plus}
                          className="add_dietplusicon"
                          onClick={this.submitText}
                        />
                      </div> */}
                    </div>
                  </div>
                </Grid>
              </Grid>

              <Divider className="blank_add_diet" />

              <div className="manage-add-flex-card">
                {this.state.menuItems.map((data, i) => {
                  return this.textSubmit(data, i);
                })}
              </div>

              <div className="meals-button">
                <Button
                  className="meals_cancel_bt"
                  onClick={(e) => this.props.closemodal(e)}
                >
                  Cancel
                </Button>
                <Button
                  className="meals_submit_bt"
                  onClick={() => this.submitSubMenu()}
                >
                  Submit
                </Button>
              </div>
              {/* <div className="add_content_div">
                       <div>
                          <div className="diet_warning" ><img src={Add_diet}  /></div>
                          <div><h3 className="no_package">No Package Added</h3></div>
                       </div>
                      
                        <div className="add_button">
                           
                           <Button  className="cancel">Cancel</Button>
                          
                           <Button type="primary" className="primary">Submit</Button>
                        </div>
                    </div> */}
            </TabPane>
          </Tabs>
          {/* </Paper> */}
        </div>
      </>
    );
  }
}
