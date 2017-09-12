import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {ProductApi} from '../../api/product';
import { Tracker } from 'meteor/tracker';
import './css/BillPage';
import Avatar from '../componants/Avatar';

export default class BillPage extends Component {
  constructor() {
    super();
    this.state={
      products:[],
      category:0,

    }
  }
  componentWillMount(){
      this.linkracker = Tracker.autorun(()=> {
        Meteor.subscribe("product");
        let products = ProductApi.find({}).fetch();
          this.setState({products});
      });
  }
  componentWillUnmount(){
    this.linkracker.stop();
  }




  handleClick(category) {
    this.setState({category});
  }





  render(){
    let products= this.state.products.filter((product)=>{
          return(product.category==this.state.category);
    })
    return(
      <Router>
      <div>
      <div className="admin-panel clearfix">
       <div className="slidebar">
         <ul>
           <li onClick={this.handleClick.bind(this,1)} ><a href="#" id="targeted"><Avatar  image="https://image.flaticon.com/icons/svg/167/167247.svg" text="Juice"/></a></li>
           <li onClick={this.handleClick.bind(this,2)} ><a href="#" id="targeted"><Avatar image="http://www.italysgr.com/images/icon/Pizza-icon.png" text="Pizza"/></a></li>
           <li onClick={this.handleClick.bind(this,3)} ><a href="#" id="targeted"><Avatar image="http://icons.iconarchive.com/icons/dapino/beach/256/icecream-icon.png" text="Icecream"/></a></li>
        </ul>
       </div>


                <div className="main box">
                
                  {products.map((product,i)=><div key={i}>
                        <input  className="productmenu" type="button" value={product.name}/>
                  </div>)}


                </div>
     </div>
      </div>
      </Router>
    );
  }
}
