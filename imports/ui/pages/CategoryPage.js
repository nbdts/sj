import React, { Component } from 'react';
export default class CategoryPage  extends Component {
  constructor() {
    super();

    this.state = {
          category: ""
        };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }



  handleSubmit(event) {
    event.preventDefault();
    }


  handleChange(event) {

    let object = {};
    object[event.target.id] = event.target.value
    this.setState(object);
    console.log(this.state.category);
  }

  render(){
    return(
       <div>
       <form onSubmit={this.handleSubmit} method="POST" className="material-form">
         <Inputs type="text" id="category" onChange={this.handleChange} label="CATEGORY"/>
         <input className="button blue" type="submit" value="submit"/>
       </form>
       </div>
    );
  }
}
class Inputs extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <section className="material-form-field space">
          <div className="material-form-field-controls">
            <div className="form-field-controls-group">
              <input id={this.props.id} required="required" placeholder={this.props.label} className="material-form-field-input" type={this.props.type} onChange={this.props.onChange}/>
              <label htmlFor={this.props.id} className="material-form-field-label">{this.props.label}</label>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
