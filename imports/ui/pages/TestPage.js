import React, {Component} from 'react';
import './css/TestPage';
import {NavLink} from 'react-router-dom';

export default class TestPage extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <nav>
          < ul className="ul">
            <li className="var_nav">
              <div className="link_bg"></div>
              <div className="link_title">
                <div className='icon'>
                  <img src={this.props.image} width='30' height='35' style={{paddingTop:5,marginLeft:10}} alt=""/>
                </div>
                <NavLink id="a" activeClassName="selected" to={this.props.link}>
                  <span className="span"><div id='tt'>{this.props.text}</div></span>
                </NavLink>
              </div>
            </li>

          </ul>
        </nav>
      </div>
    );
  }
}
