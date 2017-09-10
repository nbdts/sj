import React, {Component} from 'react';
import './css/LoginPage';
import {withRouter} from 'react-router-dom';
import {Session} from 'meteor/session';
class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      shopname: '',
      password: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);

  }
  handleChange(arg, event) {
    let object = {}
    object[arg] = event.target.value;
    this.setState(object);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.shopname === 'admin' && this.state.password === 'admin') {
      this.props.history.push('/admin')
      return false;
    }
    Meteor.call('checklogin', this.state.shopname, this.state.password, (err, result) => {
      if (err) {
        Bert.alert('Error occured', 'danger', 'growl-top-right');
        return false;
      }

      if (result.length > 0) {
        Session.setPersistent("shop", result[0]);
        Bert.alert('Loggin in', 'success', 'growl-top-right');
        this.props.history.push("/");
      }else {
        Bert.alert('User dosent exist', 'danger', 'growl-top-right');

      }
    })
  }

  render() {
    return (

      <div className="login-form-wrapper">
        <h1>
          Log In
        </h1>
        <div className="form-body">
          <form name="auth-form" method="POST" onSubmit={this.handleSubmit}>
            <div className="fieldset">
              <input id="shopname" type="text" value={this.state.shopname} onChange={this.handleChange.bind(this, 'shopname')} required/>
              <label for="shopname">
                shopname
              </label>
              <div className="highlighter"></div>

            </div>

            <div className="fieldset">
              <input required id="password" type="password" value={this.state.password} onChange={this.handleChange.bind(this, 'password')}/>
              <label for="password">
                Password
              </label>
              <div className="highlighter"></div>

            </div>

            <div className="fieldset button-set">
              <input type="submit" value="Enter"/>
            </div>
          </form>
        </div>
      </div>

    );
  }
}
export default withRouter(LoginPage);
