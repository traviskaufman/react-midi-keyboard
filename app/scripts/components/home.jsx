'use strict';

import React from 'react';

import Keyboard from './keyboard';

var Home = React.createClass({
  render() {
    return (
      <div className="container">
        <h1>A MIDI Keyboard!</h1>
        <Keyboard />
      </div>
    );
  }
});

module.exports = Home;
