//this is entry poin
//this is entry poin
//this is entry poin

import React from 'react';

import {Meteor} from 'meteor/meteor';
import {BrowserRouter as Router} from 'react-router-dom';
import {render} from 'react-dom';

import App from '../imports/ui/App.jsx';

Meteor.startup(() => {

  render(
    <Router>
      <App/>, document.getElementById('render-target'));
    </Router>

});
