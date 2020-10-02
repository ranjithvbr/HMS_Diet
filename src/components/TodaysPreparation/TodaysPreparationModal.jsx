import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Labelbox from '../../helpers/labelbox/labelbox'
import Button from '@material-ui/core/Button';
import './TodaysPreparationModal.css'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Upload } from 'antd';
import { FiInfo } from "react-icons/fi";
import uploadimage from '../../Images/plus.png'
import Modalcomp from '../../helpers/ModalComp/Modalcomp';


export default class TodaysPreparationModal extends Component {
    constructor(props){
        super(props)
        this.state={open:false}
    }
    handleOpen=()=>
    {
        this.setState({open:true})
    }
    handleClose=()=>
    {
        this.setState({open:false})
    }
    render() {
        return (
            <>
            <div className="doctor_mediauploads">
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
             <div className="media_title_head"><Labelbox type="text" labelname="Media Title"/></div>
             </Grid>
             <Grid item xs={12} md={6}>
             <div className="clinicmedia_upload">Upload<span><FiInfo className="info_icon" onClick={this.handleOpen}/></span></div>
              <div className="doctorupload_container">
               <Upload className="upload-field">
             <div className="doctormedia_button"> <Button className="clinicButton-container">
             Browse File<div className="uploadimage-container"><img className="uploadimage" src={uploadimage}/></div>
             </Button>
             </div>
             </Upload>
             </div>
         </Grid>
         <Grid item xs={12} md={12}>
         <div className="doctormedia_checkbox"><Labelbox type="textarea" labelname="Description"/></div>
         <div className="media_checkbox_container"><Checkbox/><span className="doctor_active">Active</span></div>
        <div className="doctormediabutton-container"><Button className="doctor_Upload">Upload</Button><Button className="doctorcancel-form" onClick={()=>this.props.closemodal(false)}>Cancel</Button></div>
        </Grid> 
           </Grid>
           </div>
         
            
         
        </>
        )
    }
}
