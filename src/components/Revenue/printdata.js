import React from "react";
import "./printdata.css"

export default class PrintData extends React.Component {
    render() {
            var printBodyData = this.props.printtableData.map((printdata,index)=>{
                return(
                    <tr>
                  <td>{index+1}</td>
                  <td>{printdata.customer}</td>
                  <td>{printdata.package}</td>
                  <td>{printdata.date}</td>
                  <td>{printdata.cost}</td>
                  <td>{printdata.cash}</td>
                  <td>{printdata.card}</td>
                  <td>{printdata.wallet}</td>
                  <td>{printdata.totalCharge}</td>
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
            <th>Date</th>
            <th>Cost</th>
            <th>Cash</th>
            <th>Card</th>
            <th>Wallet</th>
            <th>Total Charge</th>
          </thead>
          <tbody>
          {printBodyData}
          </tbody>
        </table>
        </div>
      );
    }
  }