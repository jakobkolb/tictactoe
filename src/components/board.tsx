import React from 'react'
import '../index.css'
import Square from './square'

interface BoardProps {
  value?: number
  name?: string
  squares: (string | null)[]
  colors: string[]
  onClick: (i: number) => void
  xIsNext?: boolean
}

const Board: React.SFC<BoardProps> = (props: BoardProps) => {
  const renderSquare = (i: number) => {
    return (
      <Square
        value={props.squares[i]}
        textcolor={props.colors[i]}
        onClick={(): void => props.onClick(i)}
      />
    )
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

export default Board
