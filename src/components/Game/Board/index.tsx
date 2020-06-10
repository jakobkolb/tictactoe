import React from 'react'
import { Square } from './Square'
import { PLAYERS } from 'types'

interface BoardProps {
  squares: (PLAYERS | null)[]
  onClick: (i: number) => void
}

export const Board: React.SFC<BoardProps> = (props: BoardProps) => {
  const renderSquare = (i: number) => {
    return (
      <Square
        player={props.squares[i]}
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
