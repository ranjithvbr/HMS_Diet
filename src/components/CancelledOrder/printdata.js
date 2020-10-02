import React from "react";
import "./printdata.css"

export default class PrintData extends React.Component {
    render() {
        console.log(this.props.printtableData,"printTableData")

            var printBodyData = this.props.printtableData.map((printdata,index)=>{
                return(
                    <tr>
                  <td>{index+1}</td>
                  <td>{printdata.name}</td>
                  <td>{printdata.gender}</td>
                  <td>{printdata.age}</td>
                  <td>{printdata.package}</td>
                  <td>{printdata.from}</td>
                  <td>{printdata.to}</td>
                  <td>{printdata.cost}</td>
                </tr>
                )
            })
        

      return (
          <div className="printtabledata">
              <div className="printDataTitle">Cancelled Orders</div>
        <table>
          <thead>
            <th>S.No</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Package</th>
            <th>Ordered Date</th>
            <th>Cancelled Date</th>
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