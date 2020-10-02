import React from "react";
import "./printdata.css"

export default class PrintData extends React.Component {
    render() {
        console.log(this.props.printtableData,"printTableData")

            var printBodyData = this.props.printtableData.map((printdata,index)=>{
                return(
                    <tr>
                  <td>{index+1}</td>
                  <td>{printdata.order}</td>
                  <td>{printdata.instruction}</td>
                  <td>{printdata.quantity}</td>
                </tr>
                )
            })
        

      return (
          <div className="printtabledata">
              <div className="printDataTitle">Tomorrow's Preparation Details</div>
        <table>
          <thead>
            <th>S.No</th>
            <th>Order</th>
            <th>Instruction</th>
            <th>Quantity</th>
          </thead>
          <tbody>
          {printBodyData}
          </tbody>
        </table>
        </div>
      );
    }
  }