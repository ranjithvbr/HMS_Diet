import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Labelbox from "../../helpers/labelbox/labelbox";
import { Tabs } from "antd";
import Plus from "../../Images/plus.png";
import Add_diet from "../../Images/add_diet.PNG";
import "./Add_Diet_plan.css";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { FiInfo } from "react-icons/fi";
import load from "../../Images/load.png";
import Modalcomp from "../../helpers/ModalComp/Modalcomp";
import Chicken from "../../Images/chicken.png";
import Dosa from "../../Images/dosa.png";
import Divider from "@material-ui/core/Divider";
import { Tag, notification } from "antd";
import { Card } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import ValidationLibrary from "../../helpers/validationfunction";
import { apiurl } from "../../App";
import { Upload, message, Select } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
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
  console.log(`selected ${value}`);
}
export default class ViewDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      loading: false,

      // state for add package
      editId: null,
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
      stored: [],
      session: [],
      filterCategory: [],
      menuItems: [],
      active:false,
      vendorId:12,

      // state for add diet item
      name: "",
      cancel: null,
      item: "",
      item_list: [],
      calory: "",
      calories: [],
      catagory: "",
      catagory_list: [],
      vegon: "",
      vegon_list: [],
      dietitem: "",
      package: [],

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
  handleChange = (event) => {
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

  componentWillMount = (props) => {
    const { duration, price, description } = this.state.labmanage_test;

    console.log(this.props.editdata, "editdata")
    const { editdata } = this.props
    if(editdata){

    this.state.labmanage_test.package.value = editdata.diet_package_name
    duration.value = editdata.diet_duration
    price.value = editdata.diet_price
    description.value = editdata.diet_description

    var Sessiondetails = []
    var deleteid = []

    editdata.Sessiondetails.map((data) => {
      Sessiondetails.push({session:data.diet_sessions})
    })

    editdata.Sessiondetails.map((data) => {
      deleteid.push(data.dietsessionId)
    })

    // for(let k=0;k<editdata.foodSession.length;k++){
    //         var obj = {};
    //         obj.diet_itemname = editdata.Foodname;
    //         obj.diet_measure = this.state.calory;
    //         obj.diet_filename = response.data.imageName;
    //         obj.diet_item_description = "";
    //         obj.diet_filter_category_id = this.state.filterCategoryId;
    //         obj.diet_package_id = this.state.packageId;
    //         obj.diet_packoption_id = this.state.sessionId;
    //         obj.imageUrl = response.data.data + response.data.imageName;
    // }

    this.setState({active:editdata.diet_active_flag==1?true:false,dietlist:Sessiondetails,dietpackageId:editdata.dietpackageId,deleteid:deleteid})
  }

  };

  submit = () => {
    const { duration, price, description } = this.state.labmanage_test;
    console.log(this.state.deleteid,"deleteid")

    for(let i = 0;i<this.state.deleteid.length;i++){
      axios({
        method: "delete",
        url: apiurl + "Diet/deletesession",
        data:{
          packageId:this.state.dietpackageId,
          id:this.state.deleteid[i]
        }
      })
    }

    axios({
      method: "POST",
      url: apiurl + "Diet/editdietpackage",
      data:
      //  {
      //   dietpackagename: this.state.labmanage_test.package.value,
      //   dietduration: duration.value,
      //   dietprice: price.value,
      //   dietdescription: description.value,
      //   dietactiveflag: this.state.active ? "1" : "0",
      //   dietvendorId: this.state.vendorId,
      //   modifiedby: "1",
      //   dietsession: this.state.dietlist,
      //   PackageId: this.state.dietpackageId,
      // },
      {
        "dietpackagename":this.state.labmanage_test.package.value,
        "dietduration":duration.value,
        "dietprice":price.value,
        "dietdescription":description.value,
        "dietactiveflag":this.state.active ? "1" : "0",
        "dietvendorId":this.state.vendorId,
        "modifiedby":"1",
        "packageId":this.state.dietpackageId,
        "dietsession":this.state.dietlist },
    }).then((response) => {
      if (response.data.status == 1) {
        //   var obj = {
        //       dietpackagename: this.state.labmanage_test.package.value,
        //       dietduration: duration.value,
        //       dietprice: price.value,
        //       dietdescription: description.value,
        //       dietactiveflag: "1",
        //       dietvendorId: this.state.vendorId,
        //       createdby: "1",
        //       dietsession: this.state.dietlist
        //   };
        //   this.setState({
        //       stored:[...this.state.stored,obj]
        //   });

        this.props.closemodal(false);
        this.props.getTableData()
        notification.success({
          message: "Package Edited Successfully",
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

  // componentWillReceiveProps = (props) => {
  //   if (props.editdata != null) {
  //     var labmanage_test = this.state.labmanage_test;
  //     labmanage_test["package"].value = props.editdata.diet_package_name;
  //     labmanage_test["duration"].value = props.editdata.diet_duration;
  //     labmanage_test["description"].value = props.editdata.diet_description;
  //     labmanage_test["price"].value = props.editdata.diet_price;

  //     var dietlist = [];

  //     for (let index = 0; index < props.editdata.foodSession.length; index++) {
  //       var obj = {};
  //       obj.session = props.editdata.foodSession[index].diet_sessions;
  //       dietlist.push(obj);
  //     }

  //     this.setState({
  //       labmanage_test,
  //       editId: props.dietpackageId,
  //       dietlist,
  //     });
  //   }
  // };

  // submit text content for add diet plan

  textSubmit = () => {
    var dietitem = (
      <div className="img_card_view">
        <Card className="img_card_food">
          <div className="presc_images">
            <CloseIcon className="close_icon_addmodal_manage" />

            <img src={Dosa} className="manage-add-food_image" />
          </div>
          <Typography variant="body2" color="textSecondary" component="p">
            Breakfast
          </Typography>

          <div className="dietitem">
            <div className="dietname">{this.state.item}</div>
            <div className="dietcalories">{this.state.calory}</div>
          </div>
          {this.state.catagory_list &&
            this.state.catagory_list.map((catagory) => (
              <Tag
                className="add-catagory-browser-li"
                closable
                onClose={this.log}
              >
                {catagory}
              </Tag>
            ))}
          {this.state.vegon_list &&
            this.state.vegon_list.map((vegon) => (
              <Tag
                className="add-catagory-browser-li"
                closable
                onClose={this.log}
              >
                {vegon}
              </Tag>
            ))}
        </Card>
      </div>
    );

    var arrval = [];

    arrval.push(...this.state.dietitem, dietitem);

    console.log(arrval, "arrval");
    this.setState({
      dietitem: arrval,
    });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  log = (e) => {
    console.log(e);
  };

  handleChange = (info) => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) =>
        this.setState({
          imageUrl,
          loading: false,
        })
      );
    }
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

            <TabPane tab={"Edit Package"} key="1" className="package_tab">
              <Grid container>
                <Grid item xs={12} md={12}>
                  <div className="sub_grid_1_add">
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
                        type="text"
                        labelname="Meal Name"
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

                          <div className="add-input-browser-li">
                          <div>{diet.session}<CloseIcon className="" onClick={() => this.deletetag(index)} /></div>
                          
                        </div>

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
                        <Button onClick={this.checkValidation}>Update</Button>
                      </div>
                    </div>
                  </div>
                </Grid>

                {/* <Grid item xs={12} md={5}>
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
                </Grid>*/}
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
