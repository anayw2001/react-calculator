import './App.css';
import React from 'react';

export default class Calculator extends React.Component {
  constructor() {
    super()
    this.state = {
      viewText: ""
    }
  }
  handleClick() {
    console.log("click")
    this.setState({
      viewText: this.state.viewText + ""
    })
  }
  render() {
    const calcView = <CalculatorView textShown={this.state.viewText}/>
    return <div>
      {calcView}
      <CalculatorKeypad calcView={this.calcView} />
    </div>
  }
}

class CalculatorView extends React.Component {
  render() {
    return <div className="calc-view">
          {this.props.textShown}
        </div>
  }
}

class CalculatorKeypad extends React.Component {
  constructor(props) {
    //parent.handleClick()
    super(props)
    this.state = {
      calcView: props.calcView
    }
  }
  renderSquare(i) {
    return <CalculatorButton value={i} calcView={this.state.calcView}/>
  }
  render() {
    return <div>
        <div className="calculator-row">
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderSquare('+')}
        </div>
        <div className="calculator-row">
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
          {this.renderSquare('-')}
        </div>
        <div className="calculator-row">
          {this.renderSquare(7)}
          {this.renderSquare(7)}
          {this.renderSquare(9)}
          {this.renderSquare('*')}
        </div>
        <div className="calculator-row">
          {this.renderSquare('')}
          {this.renderSquare(0)}
          {this.renderSquare('')}
          {this.renderSquare('/')}
        </div>
      </div>
  }

}

class CalculatorButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value,
      calculatorView: props.calcView
    }
    // this.state.calculatorView.setState = this.state.calculatorView.setState.bind(this.)
  }
  render() {
    return <button>
      {this.state.value}
    </button>
  }
}
