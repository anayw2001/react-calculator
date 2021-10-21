import './App.css';
import React from 'react';

const CalculatorOperations = {
  '/': (prevValue, nextValue) => prevValue / nextValue,
  '*': (prevValue, nextValue) => prevValue * nextValue,
  '+': (prevValue, nextValue) => prevValue + nextValue,
  '-': (prevValue, nextValue) => prevValue - nextValue,
  '=': (prevValue, nextValue) => nextValue
}

export default class Calculator extends React.Component {
  constructor() {
    super()
    this.state = {
      viewText: "",
      prevValue: null,
      operated: false,
      operator: ""
    }
    this.inputDigit = this.inputDigit.bind(this)
    this.eval = this.eval.bind(this)
    this.clearAll = this.clearAll.bind(this)
    this.clearDisplay = this.clearDisplay.bind(this)
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

  eval(nextOperator) {
    const { viewText, prevValue, operator } = this.state
    const inputValue = parseFloat(viewText)
    console.log(prevValue)
    console.log(operator)
    if (prevValue == null) {
      this.setState({
        prevValue: inputValue,
        viewText: "0"
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
    const viewText = this.state
    console.log("click")
    if (this.state.operated) {
      this.setState({
        viewText: viewText === '0' ? String(i) : viewText + i
      })
    } else {
      this.setState({
        viewText: String(i),
        operated: false
      })
    }
  }

  renderSquare(i) {
    const className = "key-" + String(i)
    return <CalculatorButton class={className} value={i} onPress={() => this.inputDigit(i)}/>
  }
  renderFunction(fn) {
    const className = "fn-" + fn
    return <CalculatorButton class={className} value={fn} onPress={() => this.eval(fn)}/>
  }
  render() {
    return <div>
      {this.state.viewText}
      <div className="calculator-row">
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderFunction('+')}
        </div>
        <div className="calculator-row">
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
          {this.renderFunction('-')}
        </div>
        <div className="calculator-row">
          {this.renderSquare(7)}
          {this.renderSquare(8)}
          {this.renderSquare(9)}
          {this.renderFunction('*')}
        </div>
        <div className="calculator-row-zero">
          {this.renderSquare(0)}
          {this.renderSquare('.')}
          {this.renderFunction('/')}
          {this.renderFunction('=')}
          <CalculatorButton class="clear-all" value="AC" onPress={() => this.clearAll()}/>
          <CalculatorButton class="clear" value="C" onPress={() => this.clearDisplay()}/>
        </div>
    </div>
  }
}

class CalculatorButton extends React.Component {
  render() {
    return <button onClick={this.props.onPress}>
      {this.props.value}
    </button>
  }
}
