import React, { Component } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
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
    };
  this.click1 = new Audio(click1);
  this.click2 = new Audio(click2);
  }

  playSound = () => {
   const {count, measure} = this.state;
    if(count % measure === 0) {
      this.click2.play();
    } else {
      this.click1.play()
    }
    this.setState({
      count: (count + 1) % measure
    });
  }

  onClick = () => {
    if(this.state.running) {
      clearInterval(this.timer);
      this.setState({
        running: false
      });
    } else {
      this.setState({
        running: true,
        count: 0
      }, this.playSound);
      this.timer = setInterval(this.playSound, (60 / this.state.bpm) * 1000);
    }
  }

  onChange = name => event => {
    if(this.state.running) {
      clearInterval(this.timer);
      // changing bpm
      this.setState({
        [name]: event.target.value,
        count: 0 
        });
      this.timer = setInterval(this.playSound, (60 / this.state.bpm) * 1000);
      } else {
        this.setState({
          [name]: event.target.value
        });
      }
  }

  render() {
    const {bpm, running, measure} = this.state;
    return (
      <div className="App">
        <h1>BPM <span>{bpm}</span></h1>
        <input type="range" min="60" max="300" value={bpm} onChange={this.onChange('bpm')}/>
        <Button size="large" color={running ? 'primary' : 'secondary'} onClick={this.onClick}>{!running ? 'Start' : 'Stop'}</Button>
        <p>{this.state.count}</p>
        <h2>Measure</h2>
        <input min="2" max="16" type="number" value={measure} onChange={this.onChange('measure')}/>
      </div>
    );
  }
}

export default App;
