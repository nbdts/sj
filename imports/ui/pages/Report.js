import React, { Component } from 'react';
import './css/Report';
import PieChart from 'react-simple-pie-chart';
export default class Report extends Component {
  constructor() {
    super();
  }
  render(){
    return(
      <div className="body">
      <div className='title'>
  <h1>
  Sandwich Junction
  </h1>
  <h2>
  Sales report overView
  </h2>
</div>
<div className='ui'>
  <div className='ui_box'>
    <div className='ui_box__inner'>
      <h2>
        Invoice Report
      </h2>
      <p>Daily invoice generated</p>
      <div className='stat'>
        <span>60%</span>
      </div>
      <div className='progress'>
        <div className='progress_bar'></div>
      </div>
      <p>the daily invoice report generated and the progress % is shown</p>
    </div>
    <div className='drop'>
      <p>Take a closer look</p>
      <div className='arrow'></div>
    </div>
  </div>
  <div className='ui_box'>
    <div className='ui_box__inner'>
      <h2>
        Sales By Type
      </h2>
      <p>Daily sales of eacch object</p>
      <div className='stat_left'>
        <ul>
          <li>
           Drinks
          </li>
          <li>
             Sandwich
          </li>
          <li>
            pizza
          </li>
          <li>
            Icecream
          </li>
        </ul>
      </div>
      <div className='progress_graph'>
        <div className='progress_graph__bar--1'></div>
        <div className='progress_graph__bar--2'></div>
        <div className='progress_graph__bar--3'></div>
        <div className='progress_graph__bar--4'></div>
      </div>
      <p>Daiy sales of each product in a bar graph formet.</p>
    </div>
    <div className='drop'>
      <p>Take a closer look</p>
      <div className='arrow'></div>
    </div>
  </div>
  <div className='ui_box'>
    <div className='ui_box__inner'>
      <h2>
        Total Sales
      </h2>
      <p>Total sales of the week</p>
      <div className='stat'>
        <span>Rs34,403.93</span>
      </div>
      <div className='progress'>
        <div className='progress_bar--two'></div>
      </div>
      <p>total sales report of the week in prograse bar the tota erning is given</p>
    </div>
    <div className='drop'>
      <p>Take a closer look</p>
      <div className='arrow'></div>
    </div>
  </div>
</div>
</div>
    );
  }
}
