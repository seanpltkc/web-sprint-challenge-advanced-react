import React, { useState } from 'react'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

export default function AppFunctional(props) {
  const [message, setMessage] = useState(initialMessage)
  const [email, setEmail] = useState(initialEmail)
  const [steps, setSteps] = useState(initialSteps)
  const [index, setIndex] = useState(initialIndex)

  // Calculates the XY coordinates based on index
  const getXY = () => {
    const x = index % 3
    const y = Math.floor(index / 3)
    return { x, y }
  }

  // Returns the message for coordinates
  const getXYMessage = () => {
    const { x, y } = getXY()
    return `Coordinates (${x}, ${y})`
  }

  // Resets the state to initial values
  const reset = () => {
    setIndex(initialIndex)
    setSteps(initialSteps)
    setEmail(initialEmail)
    setMessage(initialMessage)
  }

  // Calculates the next index based on the direction
  const getNextIndex = (direction) => {
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

  // Handles movement when a button is clicked
  const move = (evt) => {
    const direction = evt.target.id
    const nextIndex = getNextIndex(direction)
    setIndex(nextIndex)
    setSteps(steps + 1)
  }

  // Handles changes in the email input field
  const onChange = (evt) => {
    setEmail(evt.target.value)
  }

  // Handles form submission
  const onSubmit = (evt) => {
    evt.preventDefault()
    const payload = { email, steps }
    // POST request logic here (to be implemented based on your API)
    console.log('Form submitted', payload)
  }

  const xyMessage = getXYMessage()

  return (
    <div id="wrapper" className={props.className}>
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
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={move}>LEFT</button>
        <button id="up" onClick={move}>UP</button>
        <button id="right" onClick={move}>RIGHT</button>
        <button id="down" onClick={move}>DOWN</button>
        <button id="reset" onClick={reset}>reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input
          id="email"
          type="email"
          placeholder="type email"
          value={email}
          onChange={onChange}
        />
        <input id="submit" type="submit" />
      </form>
    </div>
  )
}
