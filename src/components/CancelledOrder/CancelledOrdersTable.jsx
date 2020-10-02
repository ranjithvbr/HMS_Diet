import React from "react";
import Tablecomponent from '../../helpers/TableComponent/TableComp'
import "./CancelledOrdersTable.css"

export default class CancelledOrderTable extends React.Component{

    state={
        openview:false,
        // props_loading:true,
    }

    createData=(parameter) =>{
        var keys=Object.keys(parameter)
        var values=Object.values(parameter)
  
        var returnobj={}
        
        for(var i=0;i<keys.length;i++){
        returnobj[keys[i]]=values[i]
        }
        return(returnobj)
        }

        modelopen=(data)=>{
            if(data==="view"){
                this.setState({openview:true})
            }
            else if(data==="edit"){
                this.setState({editopen:true})
            }
        }

        closemodal=()=>{
                this.setState({openview:false,editopen:false})
        }


    render(){
         
        return(
            <div>
           
                <Tablecomponent heading={[
                    { id: "sno", label: "S.no" },
                    { id: "name", label: "Name" },
                    { id: "gender", label: "Gender" },
                    { id: "age", label: "Age" },
                    { id: "package",label:"Package"},
                    { id: "from", label: "From" },
                    { id: "to", label: "To" },
                    { id: "cost(kwd)", label: "Cost(KWD)" },
                    { id: "", label: "Action" },
                
                ]}
  

            rowdata={[
                // this.createData({name: "AAMINA", gender: "Female", age: "26", package: "Fiber Diet", from: "19 Sep 2019",to:"20 Oct 2019",cost:"1010"}),
                // this.createData({name: "MOHAMED",gender: "Male", age: "63", package: "Paleo Diet", from: "19 Sep 2019",to:"20 Oct 2019",cost:"1400"}),
                // this.createData({name: "ABLA",   gender: "Male", age: "53", package: "Fiber Diet", from: "19 Sep 2019",to:"20 Oct 2019",cost:"1400"}),
                // this.createData({name: "ZAINAB", gender: "Female", age: "46", package: "Fiber Diet", from: "19 Sep 2019",to:"20 Oct 2019",cost:"1400"}),
                // this.createData({name: "SAMREEN",gender: "Female", age: "28", package: "Paleo Diet", from: "19 Sep 2019",to:"20 Oct 2019",cost:"1400"}),
                
            ]}

    tableicon_align={""}
    modelopen={(e)=>this.modelopen(e)}
    actionclose="close"
    alignheading="cus_wid_trainer_head"
    // props_loading={this.state.props_loading}
  />

        {/* <Modalcomp  visible={this.state.openview} title={"View details"} closemodal={(e)=>this.closemodal(e)}
        xswidth={"xs"}
        >
        </Modalcomp>


        <Modalcomp  visible={this.state.editopen} title={"Edit details"} closemodal={(e)=>this.closemodal(e)}
        xswidth={"xs"}
        >
        </Modalcomp> */}
              

            </div>
        )
    }
}

