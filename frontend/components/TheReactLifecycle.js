import React from 'react'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { renderChild: false }
  }
  toggleChild = () => {
    // this.state.renderChild = !this.state.renderChild // NEVER DO ANYTHING LIKE THIS
    // this.setState({ ...this.state, renderChild: !this.state.renderChild })
    this.setState(currState => ({ ...currState, renderChild: !currState.renderChild }))
  }
  render() {
    return (
      <div>
        <h2>The React Life Cycle</h2>
        <button onClick={this.toggleChild}>toggle child</button>
        {
          this.state.renderChild && <TheChild lady='gaga' />
        }
      </div>
    )
  }
}

class TheChild extends React.Component {
  constructor(props) {
    super(props)
    this.state = { counter: 0, error: '', favToys: [] }
    console.log('👉 constructor function executed')
  }
  silliness = () => console.log('sillyness')
  componentDidMount() { // use the traditional method syntax
    console.log('👉 component did mount')
    // on first render, the jsx can only show the initial state (hardcoded)
    // if we need fe to hydrate the component with data from api, we do it here
    document.addEventListener('click', this.silliness)
    // useEffect(() => {}, []) kind of equivalent
  }
  componentWillUnmount() {
    // react runs this for us
    console.log('👉 component about to die, last chance for cleanup')
    document.removeEventListener('click', this.silliness)
    // componentDidMount and componentWillUnmount IN ONE (HOOKS ONLY)
    // useEffect(() => {
    //   document.addEventListener('click', silliness)
    //   return () => {
    //     document.removeEventListener('click', silliness)
    //   }
    // }, [])
  }
  componentDidUpdate(oldProps, oldState) {
    // chance to look at current state and props, and decide to trigger
    // further state changes (axios calls etc) based on that
    console.log('👉 component re-rendered', oldProps, oldState, this.props, this.state)
    console.log(`------> before the re-render, counter was ${oldState.counter} and now it's ${this.state.counter}`)
    // this.setState() // INFINITE LOOP
    if (this.state.counter == 10) { // if state is going to change, do it conditionally
      const countTen = new CustomEvent('COUNT_TEN', { detail: this.state })
      document.dispatchEvent(countTen)
    }
    // useEffect(() => {
    //   something else that might further change component stage
    // }, [foo, bar])
  }
  increment = evt => { // eslint-disable-line
    console.log('👉 increment changes component state')
    this.setState((state) => ({
      ...state,
      counter: state.counter + 1,
    }))
  }
  render() { // use the traditional method syntax
    console.log('👉 component rendering')
    return (
      <div>
        <h3>The count is {this.state.counter}</h3>
        <button onClick={this.increment}>increment</button>
      </div>
    )
  }
}
