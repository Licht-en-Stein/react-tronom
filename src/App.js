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
    }
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
    this.setState(state => ({
      count: (state.count + 1) % state.measure
    }));
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

  onChange = name => event => {
    const bpm = event.target.value;
    if(this.state.playing) {
      clearInterval(this.timer);
      this.timer = setInterval(this.playSound, (60 / bpm) * 1000);
      this.setState({
        [name]: event.target.value,
        count: 0 
        });
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
