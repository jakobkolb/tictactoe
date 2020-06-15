import React from 'react'
import { Board } from './Board'
import * as R from 'ramda'
import { PLAYERS } from '../../types'

import { calculateWinner, clickReducer, jumpReducer } from 'helpers'
import reducer from 'helpers/reducer'

interface GameProps {
  value?: number
  name?: string
}

export interface HistoryElement {
  squares: (PLAYERS | null)[]
  xIsNext: boolean
}

export interface GameState {
  history: HistoryElement[]
  stepNumber: number
}

export class Game extends React.Component<GameProps, GameState> {
  constructor(props: GameProps) {
    super(props)
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          xIsNext: true,
        },
      ],
      stepNumber: 0,
    }
  }

  handleClick(i: number): void {
    const newState = clickReducer(this.state, { type: 'CLICK', index: i })
    this.setState(newState)
  }

  jumpTo(step: any) {
    const newState = jumpReducer(this.state, { type: 'JUMP', step: step })
    this.setState(newState)
  }

  render() {
    const history = this.state.history
    const stepNumber = this.state.stepNumber
    const current = history[stepNumber]
    const xIsNext = current.xIsNext
    const winner = calculateWinner(current.squares)

    const moves = history.map((step, move) => {
      const desc = move ? `Go to move # ${move}` : `Go to game start`
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    })

    let status
    if (winner) {
      status = `Winner: ${winner}`
    } else {
      status = `Next player: ${xIsNext ? PLAYERS.X : PLAYERS.O}`
    }

    const Status: React.SFC<{ status: string }> = ({ status }) => (
      <div>{status}</div>
    )

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>

        <div className="game-info">
          <Status status={status} />
          <ol>{moves}</ol>
        </div>
      </div>
    )
  }
}
