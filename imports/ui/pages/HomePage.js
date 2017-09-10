import React, { Component } from 'react';
import {Session} from 'meteor/session';
export default class HomePage extends Component {
  constructor() {
    super();
  }
  render(){
    console.log(Session.get("shop"));
    return(
      <div>
      <h1>HomePage </h1>
      </div>
    );
  }
}
