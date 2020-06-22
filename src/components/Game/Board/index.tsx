import React from 'react'
import { Square } from './Square/Square'

export const GameBoard: React.SFC = () => {
  return (
    <div>
      <div className="board-row">
        <Square location={0} />
        <Square location={1} />
        <Square location={2} />
      </div>
      <div className="board-row">
        <Square location={3} />
        <Square location={4} />
        <Square location={5} />
      </div>
      <div className="board-row">
        <Square location={6} />
        <Square location={7} />
        <Square location={8} />
      </div>
    </div>
  )
}
