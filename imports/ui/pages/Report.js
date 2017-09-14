import React, { Component } from 'react';
import './css/Report';
export default class Report   extends Component {
  constructor() {
    super();
  }
  render(){
    return(
       <div className="body">
       <div className="wrap">
  <h2>INVOICE OF WEEK </h2>
  <div className="barGraph">
    <ul className="graph">
      <span  className="graph-barBack">
        <li className="graph-bar" >
          <span className="graph-legend">Mon</span>
        </li>
        data-value="28.5";
      </span>

      <span className="graph-barBack">
        <li className="graph-bar" data-value="85">
          <span className="graph-legend">Tue</span>
        </li>
      </span>

      <span className="graph-barBack">
        <li className="graph-bar" data-value="70">
          <span className="graph-legend">Wed</span>
        </li>
      </span>

      <span className="graph-barBack">
        <li className="graph-bar" data-value="50">
          <span className="graph-legend">Thu</span>
        </li>
      </span>

      <span className="graph-barBack">
        <li className="graph-bar" data-value="68">
          <span className="graph-legend">Fri</span>
        </li>
      </span>
    </ul>
  </div>


</div>
       </div>
    );
  }
}
