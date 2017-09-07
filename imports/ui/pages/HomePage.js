import React, { Component } from 'react';
import Header from '../components/Header'
export default class HomePage extends Component {
  constructor() {
    super();
  }
  render(){
    return(
       <div>
       {Header}
       <h1>HOme page </h1>
       </div>
    );
  }
}
