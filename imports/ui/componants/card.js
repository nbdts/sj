import React, { Component } from 'react';
import './css/card';
export default class card  extends Component {
  constructor() {
    super();
  }
  render(){
    return(
       <div className="body">
       <div className="grid">
	<div className="card card__one">
		<figure className="card__img">
			<img src="https://res.cloudinary.com/jasonheecs/image/upload/v1479748567/card-hover/photo-1.jpg" width="340" height="280" />
		</figure>
		
	</div>

</div>
</div>

    );
  }
}
