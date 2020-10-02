import React from "react";
import "./printdata.css"

export default class PrintData extends React.Component {
    render() {
        console.log(this.props.printtableData,"printTableData")

            var printBodyData = this.props.printtableData.map((printdata,index)=>{
                return(
                    <tr>
                  <td>{index+1}</td>
                  <td>{printdata.customer}</td>
                  <td>{printdata.pack}</td>
                  <td>{printdata.address}</td>
                  <td>{printdata.phone_number}</td>
                  <td>{printdata.total_days}</td>
                </tr>
                )
            })
        

      return (
          <div className="printtabledata">
              <div className="printDataTitle">Uploaded Details</div>
        <table>
          <thead>
            <th>S.No</th>
            <th>Customer</th>
            <th>Package</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Total Days</th>
          </thead>
          <tbody>
          {printBodyData}
          </tbody>
        </table>
        </div>
      );
    }
  }