import React from 'react'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { renderChild: false }
  }
  toggleChild = () => {
    // this.state.renderChild = !this.state.renderChild // NOOOO
    // this.setState({ renderChild: !this.state.renderChild}) // object syntax
    this.setState(state => ({ renderChild: !state.renderChild })) // callback syntax
  }
  render() {
    return (
      <div>
        <h2>The React Lifecycle</h2>
        <button onClick={this.toggleChild}>toggle child</button>
        {this.state.renderChild ? <Child /> : null}
        {/* { this.state.renderChild && <Child /> } */}
      </div>
    )
  }
}

class Child extends React.Component {
  constructor(props) {
    super(props)
    this.state = { count: 0 }
    console.log('👉 constructor function ran')
  }
  incrementCount = () => {
    // this.state.count++ // NOOOO
    // this.state.count += 1 // NOOOO
    this.setState(state => ({ count: state.count + 1 }))
    console.log('👉 state was scheduled to update')
  }
  render() {
    console.log('👉 render function ran')
    return (
      <div className="child">
        <h3>The count is {this.state.count}</h3>
        <button onClick={this.incrementCount}>increment</button>
      </div>
    )
  }
}
