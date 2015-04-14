'use strict';

import React from 'react';

import Key from './key';

const KEYS = [
  { name: 'C4', midiNote: 60, color: 'white', mappedCode: 65 /* a */},
  { name: 'C#4', midiNote: 61, color: 'black', mappedCode: 87 /* w */},
  { name: 'D4', midiNote: 62, color: 'white', mappedCode: 83 /* s */ },
  { name: 'D#4', midiNote: 63, color: 'black', mappedCode: 69 /* e */ },
  { name: 'E4', midiNote: 64, color: 'white', mappedCode: 68 /* d */ },
  { name: 'F4', midiNote: 65, color: 'white', mappedCode: 70 /* f */ },
  { name: 'F#4', midiNote: 66, color: 'black', mappedCode: 84 /* t */ },
  { name: 'G4', midiNote: 67, color: 'white', mappedCode: 71 /* g */ },
  { name: 'G#4', midiNote: 68, color: 'black', mappedCode: 89 /* y */ },
  { name: 'A4', midiNote: 69, color: 'white', mappedCode: 72 /* h */ },
  { name: 'A#4', midiNote: 70, color: 'black', mappedCode: 85 /* u */ },
  { name: 'B4', midiNote: 71, color: 'white', mappedCode: 74 /* j */ },
  { name: 'C5', midiNote: 72, color: 'white', mappedCode: 75 /* k */  },
];

const MAPPED_CODES = KEYS.reduce(function(map, key) {
  map[key.mappedCode] = key;
  return map;
}, {});

const Keyboard = React.createClass({
  getDefaultProps() {
    return {
      width: '100%',
      height: '500px'
    };
  },

  componentDidMount() {
    global.addEventListener('keydown', this.handleKeyDown);
    global.addEventListener('keyup', this.handleKeyUp);
  },

  componentWillUnmount() {
    global.removeEventListener('keydown', this.handleKeyDown);
    global.removeEventListener('keyup', this.handleKeyUp);
  },

  render() {
    const pctWidth = 100 / KEYS.length;
    const whiteKeyWidth = `${pctWidth}%`;
    const blackKeyWidth = `${pctWidth * 0.8}%`;
    const keys = KEYS.map(function(k) {
      const keyStyles = {
        'display': 'inline-block',
        'backgroundColor': k.color,
        'color': k.color === 'white' ? 'black' : 'white',
        'width': k.color === 'white' ? whiteKeyWidth : blackKeyWidth,
        'height': this.props.height
      };

      return (
        <Key
            ref={`key-${k.name}`}
            key={k.name}
            name={k.name}
            midiNote={k.midiNote}
            style={keyStyles}
            onAttack={this.handleOnAttack}
            onRelease={this.handleOnRelease} />
      );
    }, this);

    const {width, height} = this.props;
    return (
      <div className="keyboard" style={{width, height}}>
        {keys}
      </div>
    );
  },

  handleOnAttack(note) {
    console.info('Attack', note);
  },

  handleOnRelease(note) {
    console.info('Release', note);
  },

  handleKeyDown(evt) {
    const key = MAPPED_CODES[evt.key || evt.keyCode];
    if (!key) {
      return;
    }

    this.refs[`key-${key.name}`].attack();
  },

  handleKeyUp(evt) {
    const key = MAPPED_CODES[evt.key || evt.keyCode];
    if (!key) {
      return;
    }

    this.refs[`key-${key.name}`].release();
  }
});

export default Keyboard;
