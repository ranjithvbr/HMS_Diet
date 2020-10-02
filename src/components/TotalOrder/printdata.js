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
                  <td>{printdata.package}</td>
                  <td>{printdata.from}</td>
                  <td>{printdata.to}</td>
                  <td>{printdata.total_days}</td>
                  <td>{printdata.cost}</td>
                </tr>
                )
            })
        

      return (
          <div className="printtabledata">
              <div className="printDataTitle">Total Order Details</div>
        <table>
          <thead>
            <th>S.No</th>
            <th>Customer</th>
            <th>Package</th>
            <th>From</th>
            <th>To</th>
            <th>Total Days</th>
            <th>Cost(KWD)</th>
          </thead>
          <tbody>
          {printBodyData}
          </tbody>
        </table>
        </div>
      );
    }
  }