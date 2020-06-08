import React from 'react'
import '../index.css'

interface SquareProps {
  value: string | null
  textcolor?: string
  onClick: () => void
}

const Square: React.SFC<SquareProps> = (props) => {
  return (
    <button
      className="square"
      onClick={(): void => props.onClick()}
      style={{ color: props.textcolor }}
    >
      {props.value}
    </button>
  )
}

export default Square
