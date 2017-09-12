import React, {Component} from 'react';
import './Avatarcss';
export default class Avatar extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="Amain">
        <div className="image">
          <img className="dimension" src={this.props.image} />
        </div>
        <div className="text">
          {this.props.text}
        </div>
      </div>
    );
  }
}
