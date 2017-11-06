import React, { Component } from 'react';
import Header from '../componants/header/Header';
import BillPage from './BillPage';
export default class HomePage extends Component {
  constructor() {
    super();
  }
  render(){
    return(
      <div className="container-fluid" style={{marginTop:64,minheight:'100vh',height:'100%',backgroundColor:'black'}}>
      <Header/>
      <BillPage/>
      </div>
    );
  }
}
