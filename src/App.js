import './App.css';
import React from 'react';

const CalculatorOperations = {
  '/': (prevValue, nextValue) => prevValue / nextValue,
  '*': (prevValue, nextValue) => prevValue * nextValue,
  '+': (prevValue, nextValue) => prevValue + nextValue,
  '-': (prevValue, nextValue) => prevValue - nextValue,
  '=': (prevValue, nextValue) => nextValue,
  '√x': (prevValue, nextValue) => nextValue**0.5,
  'n√x': (prevValue, nextValue) => prevValue**(1/nextValue),
  '^': (prevValue, nextValue) => prevValue**nextValue,
  '!': (prevValue, nextValue) => ((num)=> {
    if (num === 0 || num === 1)
      return 1;
    for (var i = num - 1; i >= 1; i--) {
      num *= i;
    }
    return num;
  })(nextValue),
}

const OperationsToWords = {
  '/': 'divide',
  '*': 'multiply',
  '+': 'plus',
  '-': 'minus',
  '=': 'equals',
  '√x': 'sqrt',
  'n√x': 'nth-rt',
  '^': 'exp',
  '!': 'fact',
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
    this.evalSingleOperandFn = this.evalSingleOperandFn.bind(this)
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
    console.log("eval prev: " + prevValue)
    console.log("eval op: " + operator)
    if (prevValue == null) {
      this.setState({
        prevValue: inputValue
      })
    } else if (operator) {
      console.log("operating")
      const currentValue = prevValue || 0
      const newValue = CalculatorOperations[operator](currentValue, inputValue)
      console.log("operated val: " + newValue)
      this.setState({
        prevValue: newValue,
      })
      this.setState(state => ({...state, viewText: String(newValue)}))
      console.log(this.state)
    }
    console.log("output: " + this.state.viewText)
    this.setState({
      operated: false,
      operator: nextOperator
    })
  }

  evalSingleOperandFn(fn) {
    console.log("operator: " + this.state.operator)
    if (this.state.operator) {
      console.log("eval")
      this.eval(this.state.operator)
    }
    const { viewText, prevValue } = this.state
    const inputValue = parseFloat(viewText)
    console.log("inputValue: " + inputValue)
    console.log("prevValue: " + prevValue)
    this.setState({
        viewText: String(CalculatorOperations[fn](null, inputValue))
      }
    )
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
  renderSingle(fn) {
    const className = "fn-" + OperationsToWords[fn]
    return <CalculatorButton className={className} value={fn} onPress={() => this.evalSingleOperandFn(fn)}/>
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

        <div className="advanced-keypad">
          {this.renderSingle('√x')}
          {this.renderFunction('n√x')}
          {this.renderFunction('^')}
          {this.renderSingle('!')}
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
