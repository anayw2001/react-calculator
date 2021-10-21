import './App.css';
import React from 'react';

const CalculatorOperations = {
  '/': (prevValue, nextValue) => prevValue / nextValue,
  '*': (prevValue, nextValue) => prevValue * nextValue,
  '+': (prevValue, nextValue) => prevValue + nextValue,
  '-': (prevValue, nextValue) => prevValue - nextValue,
  '=': (prevValue, nextValue) => nextValue
}

const OperationsToWords = {
  '/': 'divide',
  '*': 'multiply',
  '+': 'plus',
  '-': 'minus',
  '=': 'equals'
}

export default class Calculator extends React.Component {
  constructor() {
    super()
    this.state = {
      viewText: "0",
      prevValue: null,
      operated: false,
      operator: ""
    }
    this.inputDigit = this.inputDigit.bind(this)
    this.eval = this.eval.bind(this)
    this.clearAll = this.clearAll.bind(this)
    this.clearDisplay = this.clearDisplay.bind(this)
    this.negate = this.negate.bind(this)
  }

  clearDisplay() {
    this.setState({
      viewText: "0"
    })
  }

  clearAll() {
    this.setState({
      viewText: "0",
      prevValue: null,
      operated: false,
      operator: ""
    })
  }

  negate() {
    this.setState({
      viewText: String(-1*parseFloat(this.state.viewText))
    })
  }

  eval(nextOperator) {
    const { viewText, prevValue, operator } = this.state
    const inputValue = parseFloat(viewText)
    console.log(prevValue)
    console.log(operator)
    if (prevValue == null) {
      this.setState({
        prevValue: inputValue,
        //viewText: "0"
      })
    } else if (operator) {
      const currentValue = prevValue || 0
      const newValue = CalculatorOperations[operator](currentValue, inputValue)
      
      this.setState({
        viewText: String(newValue),
        prevValue: newValue,
        operator: nextOperator
      })
    }
    this.setState({
      operated: false,
      operator: nextOperator
    })
  }

  inputDigit(i) {
    const { viewText, operated } = this.state
    console.log("click")
    if (operated) {
      this.setState({
        viewText: viewText === '0' ? String(i) : viewText + String(i)
      })
    } else {
      this.setState({
        viewText: String(i),
        operated: true
      })
    }
  }

  renderSquare(i) {
    const className = "key-" + String(i)
    return <CalculatorButton className={className} value={i} onPress={() => this.inputDigit(i)}/>
  }
  renderFunction(fn) {
    const className = "fn-" + OperationsToWords[fn]
    return <CalculatorButton className={className} value={fn} onPress={() => this.eval(fn)}/>
  }
  render() {
    return <div className="calculator-root">
      <CalculatorDisplay value={this.state.viewText} />
        <div className="calculator-clear-row">
          <CalculatorButton className="clear-all" value="AC" onPress={() => this.clearAll()}/>
          <CalculatorButton className="clear" value="C" onPress={() => this.clearDisplay()}/>
          <CalculatorButton className="negate" value="±" onPress={() => this.negate()} />
          {this.renderFunction('=')}
        </div>
        <div className="main-keypad">
          <div className="calculator-row-1">
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            {this.renderSquare(3)}
            {this.renderFunction('+')}
          </div>
          <div className="calculator-row-2">
            {this.renderSquare(4)}
            {this.renderSquare(5)}
            {this.renderSquare(6)}
            {this.renderFunction('-')}
          </div>
          <div className="calculator-row-3">
            {this.renderSquare(7)}
            {this.renderSquare(8)}
            {this.renderSquare(9)}
            {this.renderFunction('*')}
          </div>
          <div className="calculator-row-zero">
            {this.renderSquare(0)}
            {this.renderSquare('.')}
            {this.renderFunction('/')}
          </div>
        </div>
        
    </div>
  }
}

class CalculatorButton extends React.Component {
  render() {
    return <button onClick={this.props.onPress} className={`calculator-key ${this.props.className}`}>
      {this.props.value}
    </button>
  }
}

class CalculatorDisplay extends React.Component {
  render() {
    return <div className="calculator-display">
      {this.props.value}
    </div>
  }
}
