'use strict';

import React from 'react';

const Key = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    midiNote: React.PropTypes.number.isRequired,
    onAttack: React.PropTypes.func,
    onRelease: React.PropTypes.func,
    style: React.PropTypes.object
  },

  getDefaultProps() {
    return {
      onAttack: function() {},
      onRelease: function() {}
    };
  },

  render() {
    return (
      <div
        className="key"
        style={this.props.style}
        onMouseDown={this.attack}
        onMouseUp={this.release}
      >{this.props.name}</div>
    );
  },

  attack() {
    this.props.onAttack(this.props.midiNote);
  },

  release() {
    this.props.onRelease(this.props.midiNote);
  }
});

export default Key;
