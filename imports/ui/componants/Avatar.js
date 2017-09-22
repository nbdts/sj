import React, {Component} from 'react';
import './Avatarcss';
export default class Avatar extends Component {
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
                  <img src={this.props.image} width='30' height='30' alt=""/>
                </div>
                <span className="span">
                  <div id='tt'>{this.props.text}</div>
                </span>
              </div>
            </li>

          </ul>
        </nav>
      </div>
    );
  }
}
