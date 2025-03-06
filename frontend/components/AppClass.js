// ❗ OPTIONAL, not required to pass the sprint
// ❗ OPTIONAL, not required to pass the sprint
// ❗ OPTIONAL, not required to pass the sprint
import React from 'react'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
}

export default class AppClass extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }

  // This calculates the X, Y coordinates based on the current index
  getXY = () => {
    const { index } = this.state
    const x = index % 3
    const y = Math.floor(index / 3)
    return { x, y }
  }

  // Returns the message for the coordinates
  getXYMessage = () => {
    const { x, y } = this.getXY()
    return `Coordinates (${x}, ${y})`
  }

  // Resets all states to initial values
  reset = () => {
    this.setState(initialState)
  }

  // This calculates the next index based on direction
  getNextIndex = (direction) => {
    const { index } = this.state
    const gridSize = 3

    switch (direction) {
      case 'left':
        if (index % gridSize !== 0) return index - 1
        return index
      case 'right':
        if (index % gridSize !== gridSize - 1) return index + 1
        return index
      case 'up':
        if (index - gridSize >= 0) return index - gridSize
        return index
      case 'down':
        if (index + gridSize < gridSize * gridSize) return index + gridSize
        return index
      default:
        return index
    }
  }

  // Handles the movement based on button press
  move = (evt) => {
    const direction = evt.target.id
    const nextIndex = this.getNextIndex(direction)
    this.setState((prevState) => ({
      index: nextIndex,
      steps: prevState.steps + 1
    }))
  }

  // Handles changes in the email input
  onChange = (evt) => {
    this.setState({ email: evt.target.value })
  }

  // Handles form submission
  onSubmit = (evt) => {
    evt.preventDefault()
    const { email } = this.state
    const payload = { email, steps: this.state.steps }
    // POST request logic here (to be implemented based on your API)
    console.log('Form submitted', payload)
  }

  render() {
    const { className } = this.props
    const { index, steps, email } = this.state
    const xyMessage = this.getXYMessage()

    return (
      <div id="wrapper" className={className}>
        <p>(This component is not required to pass the sprint)</p>
        <div className="info">
          <h3 id="coordinates">{xyMessage}</h3>
          <h3 id="steps">You moved {steps} times</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
                {idx === index ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.move}>LEFT</button>
          <button id="up" onClick={this.move}>UP</button>
          <button id="right" onClick={this.move}>RIGHT</button>
          <button id="down" onClick={this.move}>DOWN</button>
          <button id="reset" onClick={this.reset}>reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input
            id="email"
            type="email"
            placeholder="type email"
            value={email}
            onChange={this.onChange}
          />
          <input id="submit" type="submit" />
        </form>
      </div>
    )
  }
}
