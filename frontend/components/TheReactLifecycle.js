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
  clickLog = () => {
    // console.log('you clicked the document')
  }
  componentDidMount() {
    console.log('👉 component was mounted')
    document.addEventListener('click', this.clickLog)
  }
  componentWillUnmount() {
    console.log('👉 component about to be unmounted')
    document.removeEventListener('click', this.clickLog)
  }
  componentDidUpdate(oldProps, oldState) {
    console.log('👉 component updated')
    console.log(oldState, this.state)
    if (this.state.count === 5) {
      const evt = new CustomEvent('COUNT_FIVE', { detail: this.state })
      document.dispatchEvent(evt)
      // log out stuff
      // trigger a subsequent state change
      // trigger an event for the world outside the react app...
      // if we change state further from here, do it inside a conditional
    }
  }

  // useEffect(() => {
  //   // ??? stuff after first render
  //   document.addEventListener('click', clickLog)
  //   return () => {
  //     // ??? stuff right before it unmounts
  //     document.removeEventListener('click', clickLog)
  //   }
  // }, [])

  incrementCount = () => {
    // this.state.count++ // NOOOO
    // this.state.count += 1 // NOOOO
    this.setState(state => ({ count: state.count + 1 }))
    console.log('state was scheduled to update')
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
