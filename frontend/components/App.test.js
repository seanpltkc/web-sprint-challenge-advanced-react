import { render, screen, fireEvent } from '@testing-library/react'
import AppClass from './AppClass'

test('renders grid and moves the "B" block', () => {
  render(<AppClass />)

  // Ensure the grid is rendered
  const grid = screen.getByTestId('grid')
  expect(grid).toBeInTheDocument()

  // Check if "B" is initially in the right place
  const initialSquare = screen.getByText('B')
  expect(initialSquare).toBeInTheDocument()

  // Simulate moving "B" to the right
  const rightButton = screen.getByText('RIGHT')
  fireEvent.click(rightButton)

  // Check if "B" has moved
  const movedSquare = screen.getByText('B')
  expect(movedSquare).not.toEqual(initialSquare)
})