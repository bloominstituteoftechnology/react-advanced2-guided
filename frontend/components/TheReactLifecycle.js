import React from 'react'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { shouldRenderChild: false }
  }
  toggleChild = () => {

  }
  render() {
    return (
      <div className="parent">
        <h2>The React Life Cycle</h2>
        <button onClick={this.toggleChild}>toggle child</button>
        <TheChild />
      </div>
    )
  }
}

class TheChild extends React.Component {
  constructor(props) {
    super(props)
    this.state = { count: 0 }
    console.log('👉 constructor function ran')
  }
  incrementCount = () => {

  }
  render() {
    return (
      <div className="child">
        <h3>The count is {this.state.count}</h3>
        <button onClick={this.incrementCount}>increment</button>
      </div>
    )
  }
}
