import React, { Component } from 'react';
import Header from '../componants/header/Header';
import BillPage from './BillPage';
export default class HomePage extends Component {
  constructor() {
    super();
  }
  render(){
    return(
      <div>
      <Header/>
      <BillPage/>
      </div>
    );
  }
}
