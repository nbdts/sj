import React, { Component } from 'react';
import {Meteor} from 'meteor/meteor';
import './css/registcss';
import {CategoryApi} from '../../api/category';
import { Tracker } from 'meteor/tracker';

export default class CategoryPage  extends Component {
  constructor() {
    super();

    this.state = {
          newcategory: ""
        };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount(){
      this.linkracker = Tracker.autorun(()=> {
        Meteor.subscribe("category");
        let category = CategoryApi.find({}).fetch();
      });
  }
  componentWillUnmount(){
    this.linkracker.stop();
  }




  handleSubmit(event) {
    event.preventDefault();
    const newcategory = this.state.category;
console.log(newcategory);

    let categorys = {
      category: newcategory,

    }
    Meteor.call('catgory.insert', categorys);
    this.setState({
      category: ""

    });
    }


  handleChange(event) {

    let object = {};
    object[event.target.id] = event.target.value
    this.setState(object);
    console.log(this.state.newcategory);
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
