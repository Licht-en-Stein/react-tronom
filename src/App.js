import React, { Component } from 'react';
import './App.css';
import click1 from './sounds/click1.wav';
import click2 from './sounds/click2.wav';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      running: false,
      bpm: 120,
      measure: 4,
      count: 0
    }
  this.click1 = new Audio(click1);
  this.click2 = new Audio(click2);
  }

  onChange = name => event => {
    this.setState({
      [name]: event.target.value});
  };


  playSound = () => {
   const {count, measure} = this.state;
    if(count % measure === 0) {
      this.click2.play();
    } else {
      this.click1.play()
    }
    this.setState({
      count: (count + 1) % measure
    })
  }

  onClick = () => {
    if(this.state.running) {
      clearInterval(this.timer);
      this.setState({
        running: false
      });
    } else {
      this.timer = setInterval(this.playSound, (60 / this.state.bpm) * 1000);
      this.setState({
        count: 0,
        running: true
      }, this.playSound);
    }
  }

  render() {

    return (
      <div className="App">
        <h1>BPM <span>{this.state.bpm}</span></h1>
        <input type="range" min="60" max="240" value={this.state.bpm} onChange={this.onChange('bpm')}/>
        <button onClick={this.onClick}>{!this.state.running ? 'Start' : 'Stop'}</button>
        <p>{this.state.count}</p>
        <h2>Measure <span><input min="4" max="16" type="number" onChange={this.onChange('measure')}/></span></h2>
      </div>
    );
  }
}

export default App;
