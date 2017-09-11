import React, { Component } from 'react';
import {Meteor} from 'meteor/meteor';
import './css/registcss';
import {ProductApi} from '../../api/product';
import { Tracker } from 'meteor/tracker';

export default class ProductPage  extends Component {
  constructor() {
    super();

    this.state = {
          name: "",
          price:"",
          category:""
        };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount(){
      this.linkracker = Tracker.autorun(()=> {
        Meteor.subscribe("product");
        let product = ProductApi.find({}).fetch();

      });
  }
  componentWillUnmount(){
    this.linkracker.stop();
  }




  handleSubmit(event) {
    event.preventDefault();
    const name = this.state.name;
    const price = this.state.price;
    const category = this.state.category;
    let prod = {
      name:name,
      price:price,
      category:category
    }
    Meteor.call('product.insert', prod);
    this.setState({
      name:'',
      price:'',
      category:''

    });
    }


  handleChange(event) {

    let object = {};
    object[event.target.id] = event.target.value
    this.setState(object);
  }

  render(){
    return(
       <div>
       <br/>
       <form onSubmit={this.handleSubmit} method="POST" className="material-form">
         <Inputs type="text" id="name" onChange={this.handleChange} label="PRODUCT NAME"/>
         <Inputs type="text" id="price" onChange={this.handleChange} label="PRODUCT PRICE"/>
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
